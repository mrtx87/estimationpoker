import {
    estimationPokerRoomRepository,
    estimationRoomCache,
    estimationRoomService,
    estimationService,
    userService,
    websocketService
} from "../server";

import {v4 as UUID} from 'uuid';

import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {CREATE_ROOM_ERROR, ROOM_NOT_EXISTING} from "../constants/error-texts";
import {getErrorResponseHandling, getInternalErrorErrorResponseHandling} from "../util/util";
import {InitValues} from "../model/init-values";
import {ResponseMessageType, ROLE} from "../constants/global";
import {User} from "../model/user";
import {Avatar} from "../model/avatar";
import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {logger} from "./s9logger";
import {BasicResponse} from "../model/basic-response.model";
import {RoomSettings} from "../model/room-settings";
import {EstimationPokerRoomPreview} from "../model/estimation-poker-room-preview";

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
                    .then(creator => estimationService.createEstimation(newRoom, initialEstimationId)
                        .then(estimation => this.getJoinedUserResponse(newRoom.id, creator))));
        } catch (error) {
            return getInternalErrorErrorResponseHandling(error, CREATE_ROOM_ERROR).toRejectedPromise();
        }
    }

    public async joinRoomAsNewUser(joinRoomRequest: any): Promise<InitValues> {
        try {
            const roomId = joinRoomRequest.roomId;
            const userName = joinRoomRequest.userName;
            const avatar = joinRoomRequest.avatar
            return this.getJoiningRoom(roomId)
                .then(joiningRoom => {
                    return userService.createUser(userName, avatar, roomId)
                        .then(joiningUser => {
                            estimationRoomCache.addUserToRoomIfCached(roomId, joiningUser);
                            return this.getJoinedUserResponse(joiningRoom.id, joiningUser);
                        }, e => e);
                }, e => e);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public processDisconnectClient(connection: any) {
        const cachedRoom = estimationRoomCache.getCachedRoom(connection.roomId);
        if (cachedRoom) {
            cachedRoom.removeConnection(connection);
            if (cachedRoom.connections.length === 0) {
                estimationRoomService.storeCachedRoom(cachedRoom);
            }
            websocketService.notifyUsers(new BasicResponse(ResponseMessageType.USER_DISCONNECTED, connection.userId), cachedRoom.connections);
            logger.log('user ' + connection.userId + ' disconnected from room ' + connection.roomId);
        }
    }

    async restoreRoom(dbRoom: EstimationPokerRoom) {
        const users = await userService.getUsersByRoomId(dbRoom.id);
        const currentEstimation = await estimationService.getEstimationById(dbRoom.currentEstimationId);
        const cachedRoom = CachedEstimationPokerRoom.from(dbRoom, users, currentEstimation);
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

    storeCachedRoom(cachedRoom: CachedEstimationPokerRoom) {
        const estimationPokerRoom = EstimationPokerRoom.from(cachedRoom);
        cachedRoom.users.forEach(userService.updateUser);
        estimationService.saveEstimation(cachedRoom.currentEstimation);
        estimationPokerRoomRepository.updateRoom(estimationPokerRoom);
        estimationRoomCache.removeRoomFromCache(cachedRoom.id);
        logger.info(`Cached Rooms: ${estimationRoomCache.count()}`);
    }

    async getCachedRoom(roomId: string, addToCacheIfRestored = false) {
        let cachedRoom = estimationRoomCache.getCachedRoom(roomId);
        if (cachedRoom) {
            return cachedRoom;
        }
        const dbRoom = await estimationPokerRoomRepository.getRoomById(roomId);
        if (!dbRoom) {
            return null;
        }
        const restoredRoom = await this.restoreRoom(dbRoom);
        if (addToCacheIfRestored) {
            estimationRoomCache.addRoomToCache(restoredRoom);
        }
        return restoredRoom;
    }

    async getRoomPreviewsInfo(roomAuthentications: any[]) {
        const roomPreviewInfos: EstimationPokerRoomPreview[] = [];
        try {
            for (let roomAuth of roomAuthentications) {
                const room = await this.getCachedRoom(roomAuth.roomId);
                if (!room) {
                    continue;
                }
                const user = room.users.find((u: User) => u.id === roomAuth.userId);
                if (!user) {
                    continue;
                }

                roomPreviewInfos.push(EstimationPokerRoomPreview.from(room, user))
            }
        } catch (e) {
            return Promise.reject(e);
        }
        return roomPreviewInfos;
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
        return getErrorResponseHandling(ROOM_NOT_EXISTING, ResponseCode.CONFLICTING).toRejectedPromise();

    }
}
