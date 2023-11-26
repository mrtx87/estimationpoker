import {
    estimationPokerRoomRepository, estimationRoomCache,
    userService,
    websocketService
} from "../server";

import {v4 as UUID} from 'uuid';

import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {logger} from "./s9logger";
import {CREATE_ROOM_ERROR, ERROR_WHILE_JOINING_ROOM, ROOM_NOT_EXISTING} from "../constants/error-texts";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {getBadRequestErrorResponseHandling, getInternalErrorErrorResponseHandling} from "../util/util";
import {InitValues} from "../model/init-values";
import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";
import {ROLE} from "../constants/global";
import {User} from "../model/user";
import {Avatar} from "../model/avatar";

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
        roomTitle: string,
        avatar: Avatar
    }): Promise<InitValues | ErrorResponse> {
        try {
            return userService.createUser(createRoomRequest.userName, createRoomRequest.avatar, [ROLE.MODERATOR])
                .then(creator => estimationPokerRoomRepository
                    .createEstimationPokerRoom(createRoomRequest.roomTitle, creator)
                    .then(newRoom => this.getJoinedUserResponse(newRoom.id, creator)));
        } catch (error) {
            return getInternalErrorErrorResponseHandling(error, CREATE_ROOM_ERROR).toRejectedPromise();
        }
    }
    public async joinRoomAsNewUser(joinRoomRequest: any): Promise<InitValues> {
        const roomId = joinRoomRequest.roomId;
        const userName = joinRoomRequest.userName;
        const avatar = joinRoomRequest.avatar
        return this.getJoiningRoom(roomId)
            .then(joiningRoom => userService.createUser(userName, avatar)
                .then(joiningUser => this.getJoinedUserResponse(joiningRoom.id, joiningUser)));
    }

    public async joinRoomAsKnownUser(rejoinRoomRequest: any): Promise<InitValues> {
        const roomId = rejoinRoomRequest.roomId;
        const userId = rejoinRoomRequest.userId;
        return this.getJoiningRoom(roomId)
            .then(joiningRoom => userService.getUser(userId)
                .then(user => this.getJoinedUserResponse(joiningRoom.id, user)));
    }

    public processDisconnectClient(roomId: string, userId: string) {
        const room = estimationPokerRoomRepository.getRoomById(roomId);
        if (room) {
            console.log(room);
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

    private getJoinedUserResponse(roomId: string, user: User) {
        const jwtToken = userService.getSignedJwtToken(user.id, roomId);
        return new InitValues({
            token: jwtToken,
            user: user,
            roomId: roomId
        });
    }

}
