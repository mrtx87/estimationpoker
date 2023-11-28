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

export class EstimationRoomService {
    private static INSTANCE: EstimationRoomService = new EstimationRoomService();

    public static get estimationRoomService(): EstimationRoomService {
        return EstimationRoomService.INSTANCE;
    }

    private constructor() {
    }

    static startedAt: number = 0;

    public createRoom(createRoomRequest: {
        userName: string,
        avatar: Avatar,
        roomSettings: RoomSettings
    }): Promise<InitValues | ErrorResponse> {
        try {
            const initialEstimationId = UUID();
            const estimationPokerRoom = EstimationPokerRoom.createEstimationPokerRoom(createRoomRequest.roomSettings, initialEstimationId);
            return estimationPokerRoomRepository
                .createEstimationPokerRoom(estimationPokerRoom)
                .then(newRoom => userService.createUser(createRoomRequest.userName, createRoomRequest.avatar, newRoom.id, [ROLE.MODERATOR])
                    .then(creator => this.createEstimation(newRoom.id, newRoom.roomSettings, initialEstimationId)
                        .then(estimation => this.getJoinedUserResponse(newRoom.id, creator))));
        } catch (error) {
            return getInternalErrorErrorResponseHandling(error, CREATE_ROOM_ERROR).toRejectedPromise();
        }
    }

    public async joinRoomAsNewUser(joinRoomRequest: any): Promise<InitValues> {
        const roomId = joinRoomRequest.roomId;
        const userName = joinRoomRequest.userName;
        const avatar = joinRoomRequest.avatar
        return this.getJoiningRoom(roomId)
            .then(joiningRoom => userService.createUser(userName, avatar, roomId)
                .then(joiningUser => {
                    estimationRoomCache.addUserToRoomIfCached(roomId, joiningUser);
                    return this.getJoinedUserResponse(joiningRoom.id, joiningUser);
                }));
    }

    public async joinRoomAsKnownUser(rejoinRoomRequest: any): Promise<InitValues> {
        const roomId = rejoinRoomRequest.roomId;
        const userId = rejoinRoomRequest.userId;
        return this.getJoiningRoom(roomId)
            .then(joiningRoom => userService.getUser(userId)
                .then(user => this.getJoinedUserResponse(joiningRoom.id, user)));
    }

    public processDisconnectClient(connection: any) {
        // TODO if user is last one - update room in DB and remove from cache
        const cachedRoom = estimationRoomCache.getCachedRoom(connection.roomId);
        if (cachedRoom) {
            cachedRoom.removeConnection(connection);
            websocketService.notifyUsers(new BasicResponse(ResponseMessageType.USER_DISCONNECTED, connection.userId), cachedRoom.connections);
            logger.log('user ' + connection.userId + ' disconnected from room ' + connection.roomId);
        }
    }

    private async getJoiningRoom(roomId: string) {
        let cachedRoom: any = estimationRoomCache.getCachedRoom(roomId);
        if (cachedRoom) {
            return Promise.resolve(cachedRoom);
        }
        const dbRoom = await estimationPokerRoomRepository.getRoomById(roomId);
        if (dbRoom) {
            return dbRoom;
        }
        return Promise.reject();

    }

    async restoreRoomToCache(dbRoom: EstimationPokerRoom) {
        const users = await userService.getDBUsersByRoomId(dbRoom.id);
        const currentEstimation = await estimationRoomService.getEstimationById(dbRoom.currentEstimationId);
        const cachedRoom = CachedEstimationPokerRoom.from(dbRoom, users, currentEstimation);
        estimationRoomCache.addRoomToCache(cachedRoom);
        return cachedRoom;
    }

    createEstimation(roomId: string, roomSettings: RoomSettings, initialEstimationId?:string) {
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

    private getJoinedUserResponse(roomId: string, user: User) {
        const jwtToken = userService.getSignedJwtToken(user.id, roomId);
        return new InitValues({
            token: jwtToken,
            user: user,
            roomId: roomId
        });
    }
}
