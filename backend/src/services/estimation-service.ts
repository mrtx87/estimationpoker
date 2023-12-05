import {
    estimationPokerRoomRepository,
    estimationRoomCache, estimationRoomService,
    userService, websocketService
} from "../server";

import {v4 as UUID} from 'uuid';

import {ErrorResponse} from "../controller-config/rest-controller-configurator";
import {CREATE_ROOM_ERROR} from "../constants/error-texts";
import {getInternalErrorErrorResponseHandling} from "../util/util";
import {InitValues} from "../model/init-values";
import {ESTIMATION_TIMER_STATE, ResponseMessageType, ROLE, VOTING_STATE} from "../constants/global";
import {User} from "../model/user";
import {Avatar} from "../model/avatar";
import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {logger} from "./s9logger";
import {BasicResponse} from "../model/basic-response.model";
import {RoomSettings} from "../model/room-settings";
import {Estimation} from "../model/estimation";
import {EstimationTimer} from "../model/estimation-timer";
import {EstimationModel} from "../db/mongodb/db-schemas";
import {Evaluation} from "../model/evaluation";
import {ValueByAmount} from "../model/value-by-number";

export class EstimationService {
    private static INSTANCE: EstimationService = new EstimationService();

    public static get estimationService(): EstimationService {
        return EstimationService.INSTANCE;
    }

    private constructor() {
    }

    static startedAt: number = 0;

    async restoreRoomToCache(dbRoom: EstimationPokerRoom) {
        const users = await userService.getUsersByRoomId(dbRoom.id);
        const currentEstimation = await this.getEstimationById(dbRoom.currentEstimationId);
        const cachedRoom = CachedEstimationPokerRoom.from(dbRoom, users, currentEstimation);
        estimationRoomCache.addRoomToCache(cachedRoom);
        return cachedRoom;
    }

    createEstimation(room: EstimationPokerRoom | CachedEstimationPokerRoom, initialEstimationId?: string) {
        const estimationId = initialEstimationId ? initialEstimationId : UUID();
        const estimation = new Estimation({
            id: estimationId,
            createdAt: Date.now(),
            roomId: room.id,
            title: 'Schätzung' + room.estimationCount,
            state: VOTING_STATE.VOTING,
            valueOptions: room.roomSettings.valueOptions,
            evaluation: new Evaluation({
                estimationId: estimationId,
                avg: 0,
                valuesByAmount: [],
                deviation: 0,
                amountOfVotes: 0
            }),
            votes: [],
            timer: new EstimationTimer({
                startTime: Date.now(),
                state: ESTIMATION_TIMER_STATE.RUNNING
            }),
        });
        const estimationModel = new EstimationModel(estimation);
        return estimationModel.save().then(Estimation.of)
    }

    getEstimationById(estimationId: string) {
        return EstimationModel.findOne({id: estimationId}).then(Estimation.of);
    }

    deleteEstimations(roomId: string) {
        EstimationModel.find({roomId: roomId}).then(estimationModels => estimationModels.forEach(em => em.delete()));
    }

    saveEstimation(estimation: Estimation) {
        EstimationModel.findOne({id: estimation.id}).then(foundEstimation => {
            this.updateEstimationSafe(foundEstimation, estimation);
            foundEstimation.save().then(e => e ? logger.info(`stored estimation: ${e.id} from room: ${e.roomId}`) : logger.error(`stored estimation missing`));
        });
    }

    getClosedEstimations(roomId: string, beforeDate: number = null) {
        try {
            const queryParams = {
                roomId: roomId,
                state: VOTING_STATE.CLOSED,
            }

            return EstimationModel.find(beforeDate ? {
                ...queryParams,
                createdAt: {$lt: 25}
            } : queryParams).sort( { "createdAt": -1 } )
                .limit(15).then(estimations => estimations.map(Estimation.of))
        }catch (e) {
            return Promise.reject(e);
        }
    }

    private updateEstimationSafe(storedEstimation: any, cachedEstimation: Estimation) {
        storedEstimation.title = cachedEstimation.title;
        storedEstimation.timer = cachedEstimation.timer;
        storedEstimation.votes = cachedEstimation.votes;
        storedEstimation.state = cachedEstimation.state;
        storedEstimation.evaluation = cachedEstimation.evaluation;
    }

}
