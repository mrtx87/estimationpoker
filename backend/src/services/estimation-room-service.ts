import {
    estimationPokerRoomRepository,
    estimationRoomCache, estimationService,
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
                    .then(creator => estimationService.createEstimation(newRoom.id, newRoom.roomSettings, initialEstimationId)
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

    public processDisconnectClient(connection: any) {
        // TODO if user is last one - update room in DB and remove from cache
        const cachedRoom = estimationRoomCache.getCachedRoom(connection.roomId);
        if (cachedRoom) {
            cachedRoom.removeConnection(connection);
            websocketService.notifyUsers(new BasicResponse(ResponseMessageType.USER_DISCONNECTED, connection.userId), cachedRoom.connections);
            logger.log('user ' + connection.userId + ' disconnected from room ' + connection.roomId);
        }
    }

    async restoreRoomToCache(dbRoom: EstimationPokerRoom) {
        const users = await userService.getUsersByRoomId(dbRoom.id);
        const currentEstimation = await estimationService.getEstimationById(dbRoom.currentEstimationId);
        const cachedRoom = CachedEstimationPokerRoom.from(dbRoom, users, currentEstimation);
        estimationRoomCache.addRoomToCache(cachedRoom);
        return cachedRoom;
    }

    deleteRoom(cachedRoom: CachedEstimationPokerRoom) {
        return estimationPokerRoomRepository.deleteRoom(cachedRoom.id)
            .then(success => {
                if (success) {
                    estimationRoomCache.removeRoomFromCache(cachedRoom.id);
                    estimationService.deleteEstimations(cachedRoom.id);
                    userService.deleteUsers(cachedRoom.id);
                    return success;
                }
                return false;
            })
    }

    private getJoinedUserResponse(roomId: string, user: User) {
        const jwtToken = userService.getSignedJwtToken(user.id, roomId);
        return new InitValues({
            token: jwtToken,
            user: user,
            roomId: roomId
        });
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
}
