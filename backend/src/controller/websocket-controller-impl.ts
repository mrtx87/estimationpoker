import {AuthenticatedRequest} from "../model/authenticated-request.model";
import {BasicRequest} from "../model/basic-request.model";
import {RequestMessageType, ResponseMessageType, ROLE} from "../constants/global";
import {
    estimationPokerRoomRepository,
    estimationRoomCache,
    estimationRoomService,
    userService,
    websocketService
} from "../server";
import {BasicResponse} from "../model/basic-response.model";
import {logger} from "../services/s9logger";
import {User} from "../model/user";
import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";


const MongoClient = require("mongodb").MongoClient;


export class WebsocketControllerImpl {
    private static INSTANCE: WebsocketControllerImpl = new WebsocketControllerImpl();

    websocketControllerEndpoints: Map<string, WebsocketControllerEndpoint> = new Map<string, WebsocketControllerEndpoint>();

    public static get websocketControllerImpl(): WebsocketControllerImpl {
        return WebsocketControllerImpl.INSTANCE;
    }

    addWebsocketEndpoint(config: WebsocketControllerEndpoint) {
        this.websocketControllerEndpoints.set(config.type, config);
        return this;
    }

    private constructor() {
        this.applyConfigSettings();
    }

    applyConfigSettings() {
        this.addWebsocketEndpoint({
            type: RequestMessageType.FINALIZE_JOIN,
            action: this.finalizeJoin.bind(this),
            authorize: this.getRolePredicament([ROLE.PARTICIPANT, ROLE.MODERATOR, ROLE.SPECTATOR])
        }).addWebsocketEndpoint({
            type: RequestMessageType.PING,
            action: this.ping.bind(this),
            authorize: this.getTruePredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.REVEAL_VOTES,
            action: this.revealVotes.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.RESET_VOTES,
            action: this.resetVotes.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.NEXT_ESTIMATION,
            action: this.nextEstimation.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.DELETE_ROOM,
            action: this.deleteRoom.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.DELETE_USER,
            action: this.deleteUser.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_ROLE,
            action: this.changeRole.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_USERNAME,
            action: this.changeUsername.bind(this),
            authorize: (user: User, connection: any) => user.id === connection.id
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_AVATAR,
            action: this.changeAvatar.bind(this),
            authorize: (user: User, connection: any) => user.id === connection.id
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_ROOM_SETTINGS,
            action: this.changeRoomSettings.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        })
    }

    onPlayerMessageIncoming(request: AuthenticatedRequest, connection: any) {
        try {
            const endPoint = this.websocketControllerEndpoints.get(request.type);
            if (!endPoint) {
                //TODO answer
            }
            const authenticated = userService.authenticateToken(request.token);
            if (!authenticated) {
                //TODO answer
            }

            this.preRequestHandling(authenticated.roomId, authenticated.userId, connection)
                .then(cachedRoom => {
                    if (!endPoint.authorize(this.getAuthenticatedUser(authenticated.userId, cachedRoom), connection)) {
                        // TODO answer
                        return null;
                    }
                    return cachedRoom;
                }, (error) => null)
                .then(cachedRoom => cachedRoom ? endPoint.action(cachedRoom, authenticated.userId, new BasicRequest(request), connection) : {});
        } catch (e) {
            console.log(e);
        }
    }

    getAuthenticatedUser(userId: string, cachedRoom: CachedEstimationPokerRoom) {
        return cachedRoom.users.find(u => u.id === userId);
    }

    async finalizeJoin(cachedRoom: CachedEstimationPokerRoom, joiningUserId: string, request: AuthenticatedRequest, connection: any) {
        connection.userId = joiningUserId;
        connection.roomId = cachedRoom.id;
        logger.info(`user ${joiningUserId} joined room: ${cachedRoom.id}`);
        cachedRoom.addConnection(connection);
        websocketService.notifyUser(new BasicResponse(ResponseMessageType.JOINED_ESTIMATION_SESSION, joiningUserId, cachedRoom.toPublicDTO()), connection);
        websocketService.notifyUsers(new BasicResponse(ResponseMessageType.ANOTHER_USER_JOINED_SESSION, joiningUserId, cachedRoom.toPublicDTO()), cachedRoom.connections.filter(c => c.userId !== joiningUserId));
    }

    ping(cachedRoom: CachedEstimationPokerRoom, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    revealVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    resetVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    nextEstimation(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    deleteRoom(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    deleteUser(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeRole(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeAvatar(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeUsername(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeRoomSettings(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    async preRequestHandling(roomId: string, userId: string, connection: any) {
        let cachedRoom = estimationRoomCache.getCachedRoom(roomId);
        if (cachedRoom) {
            return cachedRoom;
        }
        const dbRoom = await estimationPokerRoomRepository.getRoomById(roomId);
        if (!dbRoom) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ROOM_NOT_EXISTING, userId, null), connection);
            return Promise.reject('room does not exists');
        }
        return estimationRoomService.restoreRoomToCache(dbRoom);
    }

    private getRolePredicament(roles: string[]) {
        return (user: User, connection: any) => user.roles.some(role => roles.includes(role));
    }

    private getModeratorOnlyPredicament() {
        return this.getRolePredicament([ROLE.MODERATOR]);
    }

    private getTruePredicament() {
        return (user: User, connection: any) => true;
    }

}

export class WebsocketControllerEndpoint {
    type: string;
    action: (cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) => void;
    authorize: (requestingUser: User, connection: any) => boolean

    constructor(init: WebsocketControllerEndpoint) {
        this.authorize = init.authorize;
        this.action = init.action;
        this.type = init.type;
    }
}