import {
    estimationPokerRoomRepository,
    estimationRoomCache, estimationRoomService,
    userService, websocketService
} from "../server";


import {ErrorResponse} from "../controller-config/rest-controller-configurator";
import {CREATE_ROOM_ERROR} from "../constants/error-texts";
import {getInternalErrorErrorResponseHandling} from "../util/util";
import {InitValues} from "../model/init-values";
import {ResponseMessageType, ROLE} from "../constants/global";
import {DBUser, User} from "../model/user";
import {Avatar} from "../model/avatar";
import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {logger} from "./s9logger";
import {BasicResponse} from "../model/basic-response.model";

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
            return estimationPokerRoomRepository
                .createEstimationPokerRoom(createRoomRequest.roomTitle)
                .then(newRoom => userService.createUser(createRoomRequest.userName, createRoomRequest.avatar, newRoom.id, [ROLE.MODERATOR])
                    .then(creator => this.getJoinedUserResponse(newRoom.id, creator)));
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
                    const cachedRoom = estimationRoomCache.getCachedRoom(joiningRoom.id);
                    if (cachedRoom) {
                        cachedRoom.users.push(joiningUser);
                    }
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
        //const room = estimationPokerRoomRepository.getRoomById(roomId);
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
        const cachedRoom = CachedEstimationPokerRoom.from(dbRoom, users);
        estimationRoomCache.addRoomToCache(cachedRoom);
        return cachedRoom;
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
