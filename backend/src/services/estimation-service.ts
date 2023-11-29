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

    createEstimation(roomId: string, roomSettings: RoomSettings, initialEstimationId?: string) {
        const estimationId = initialEstimationId ? initialEstimationId : UUID();
        const estimation = new Estimation({
            id: estimationId,
            createdAt: Date.now(),
            roomId: roomId,
            title: 'Schätzung' + UUID(),
            state: VOTING_STATE.VOTING,
            valueOptions: roomSettings.valueOptions,
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
}
