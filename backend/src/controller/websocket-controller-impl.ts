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
import {connection} from "mongoose";
import {User} from "../model/user";


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

    onPlayerMessageIncoming(request: AuthenticatedRequest, playerConnection: any) {
        try {
            const endPoint = this.websocketControllerEndpoints.get(request.type);
            if (!endPoint) {
                //TODO answer
            }
            const authenticated = userService.authenticateToken(request.token);
            if (!authenticated) {
                //TODO answer
            }

            //TODO authorization

            endPoint.action(authenticated.roomId, authenticated.userId, new BasicRequest(request), playerConnection);

        } catch (e) {
            console.log(e);
        }
    }

    async finalizeJoin(roomId: string, joiningUserId: string, request: AuthenticatedRequest, userWsConnection: any) {
        let cachedRoom = estimationRoomCache.getCachedRoom(roomId);
        userWsConnection.userId = joiningUserId;
        userWsConnection.roomId = roomId;
        if (!cachedRoom) {
            const dbRoom = await estimationPokerRoomRepository.getRoomById(roomId);
            if (!dbRoom) {
                websocketService.notifyUser(new BasicResponse(ResponseMessageType.ROOM_NOT_EXISTING, joiningUserId, null), userWsConnection);
                return;
            }
            cachedRoom = await estimationRoomService.restoreRoomToCache(dbRoom);
        }
        logger.info(`user ${joiningUserId} joined room: ${roomId}`);
        cachedRoom.addConnection(userWsConnection);
        websocketService.notifyUser(new BasicResponse(ResponseMessageType.JOINED_ESTIMATION_SESSION, joiningUserId, cachedRoom.toPublicDTO()), userWsConnection);
        websocketService.notifyUsers(new BasicResponse(ResponseMessageType.ANOTHER_USER_JOINED_SESSION, joiningUserId, cachedRoom.toPublicDTO()), cachedRoom.connections.filter(c => c.userId !== joiningUserId));
    }

    ping(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    revealVotes(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    resetVotes(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    nextEstimation(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    deleteRoom(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    deleteUser(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    changeRole(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    changeAvatar(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    changeUsername(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }

    changeRoomSettings(roomId: string, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${roomId}]`);
    }


    private getRolePredicament(roles: string[]){
        return (user: User, connection: any) => user.roles.some(role => roles.includes(role));
    }

    private getModeratorOnlyPredicament() {
        return this.getRolePredicament([ROLE.MODERATOR]);
    }

    private getTruePredicament(){
        return (user: User, connection: any) => true;
    }

}

export class WebsocketControllerEndpoint {
    type: string;
    action: (roomId: string, userId: string, request: BasicRequest, connection: any) => void;
    authorize: (requestingUser: User, connection: any) => boolean

    constructor(init: WebsocketControllerEndpoint) {
        this.authorize = init.authorize;
        this.action = init.action;
        this.type = init.type;
    }
}