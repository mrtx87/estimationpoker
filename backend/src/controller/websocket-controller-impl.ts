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
            requiredRole: [ROLE.PARTICIPANT, ROLE.MODERATOR, ROLE.SPECTATOR]
        }).addWebsocketEndpoint({
            type: RequestMessageType.PING,
            action: this.ping.bind(this),
            requiredRole: [ROLE.PARTICIPANT, ROLE.MODERATOR, ROLE.SPECTATOR]
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

    ping(roomId: string, userId: string, request: AuthenticatedRequest, playerConnection: any) {
        logger.log(`${request.type} : ${userId} [roomId: ${roomId}]`);
    }


}

export class WebsocketControllerEndpoint {
    type: string;
    action: (roomId: string, userId: string, request: BasicRequest, connection: any) => void;
    requiredRole: string[]

    constructor(init: WebsocketControllerEndpoint) {
        this.requiredRole = init.requiredRole;
        this.action = init.action;
        this.type = init.type;
    }
}