import {AuthenticatedRequest} from "../model/authenticated-request.model";
import {BasicRequest} from "../model/basic-request.model";
import {RequestMessageType, ResponseMessageType, ROLE, SYSTEM_USER_ID, VOTING_STATE} from "../constants/global";
import {
    estimationPokerRoomRepository,
    estimationRoomCache,
    estimationRoomService, estimationService,
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
            type: RequestMessageType.CHANGE_AVATAR,
            action: this.changeAvatar.bind(this),
            authorize: (user: User, connection: any) => user.id === connection.userId
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_ESTIMATION_TITLE,
            action: this.changeEstimationTitle.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_ROOM_SETTINGS,
            action: this.changeRoomSettings.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_USERNAME,
            action: this.changeUsername.bind(this),
            authorize: (user: User, connection: any) => user.id === connection.userId
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_ROLE,
            action: this.changeRole.bind(this),
            authorize: this.getModeratorOnlyPredicament()
        })
    }

    onPlayerMessageIncoming(request: AuthenticatedRequest, connection: any) {
        try {
            const endPoint = this.websocketControllerEndpoints.get(request.type);
            if (!endPoint) {
                websocketService.notifyUser(new BasicResponse(ResponseMessageType.ACTION_UNKNOWN), connection);
                return;
            }

            const authenticated = userService.authenticateToken(request.token);
            if (!authenticated) {
                websocketService.notifyUser(new BasicResponse(ResponseMessageType.UNKNOWN_USER), connection);
                return;
            }

            this.preRequestHandling(authenticated.roomId, authenticated.userId, connection)
                .then(cachedRoom => {
                    if (!endPoint.authorize(this.getAuthenticatedUser(authenticated.userId, cachedRoom), connection)) {
                        websocketService.notifyUser(new BasicResponse(ResponseMessageType.REMOVED_FROM_ROOM), connection);
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
        cachedRoom.currentEstimation.state = VOTING_STATE.REVEALED;
        // TODO evaluation
        this.notifyAllUserAboutCompleteRoomUpdate(ResponseMessageType.REVEALED_VOTES, cachedRoom, userId);
    }

    resetVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        cachedRoom.currentEstimation.state = VOTING_STATE.VOTING;
        cachedRoom.currentEstimation.votes = [];
        this.notifyAllUserAboutCompleteRoomUpdate(ResponseMessageType.RESETED_VOTES, cachedRoom, userId);
    }

    async nextEstimation(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        const previousEstimation = cachedRoom.currentEstimation;
        estimationService.saveEstimation(previousEstimation);
        const nextEstimation = await estimationService.createEstimation(cachedRoom.id, cachedRoom.roomSettings);
        cachedRoom.setEstimation(nextEstimation);
        this.notifyAllUserAboutCompleteRoomUpdate(ResponseMessageType.RESETED_VOTES, cachedRoom, userId);
    }

    deleteRoom(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        estimationRoomService.deleteRoom(cachedRoom).then(removeSuccess => {
            if (removeSuccess) {
                websocketService.notifyUsers(new BasicResponse(ResponseMessageType.ROOM_DELETED, SYSTEM_USER_ID, {
                    roomId: cachedRoom.id,
                    title: cachedRoom.roomSettings.title
                }), cachedRoom.connections);
                return;
            }
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ROOM_NOT_EXISTING, SYSTEM_USER_ID, {
                roomId: cachedRoom.id,
                title: cachedRoom.roomSettings.title
            }), connection);
        });
    }

    deleteUser(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        return userService.deleteUser(request.data.userId).then(deleteSuccess => {
            if (deleteSuccess) {
                cachedRoom.removeUser(request.data.userId);
                websocketService.notifyUsers(new BasicResponse(ResponseMessageType.USER_DELETED, SYSTEM_USER_ID, request.data), cachedRoom.connections);
                return;
            }
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.USER_NOT_EXISTING, SYSTEM_USER_ID, request.data), connection);
        })
    }

    changeRole(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeAvatar(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        const newAvatar = request.data;
        const user = cachedRoom.users.find(u => u.id === userId);
        user.avatar = newAvatar;
        this.notifyAllUserAboutUpdate(ResponseMessageType.AVATAR_CHANGED, user, cachedRoom.connections, userId);
    }

    changeUsername(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeRoomSettings(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        logger.log(`not implemented: ${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    changeEstimationTitle(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        if(cachedRoom.currentEstimation.id === request.data.estimationId) {
            cachedRoom.currentEstimation.title = request.data.title;
            this.notifyAllUserAboutUpdate(ResponseMessageType.ESTIMATION_TITLE_UPDATED, {estimationTitle: cachedRoom.currentEstimation.title}, cachedRoom.connections, userId);
        }

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

    private notifyAllUserAboutUpdate(responseMessageType: string, data: any, connections: any[],  triggeredBy: string = 'system', ) {
        websocketService.notifyUsers(new BasicResponse(responseMessageType, triggeredBy, data), connections);
    }

    private notifyAllUserAboutCompleteRoomUpdate(responseMessageType: string, cachedRoom: CachedEstimationPokerRoom, triggeredBy: string = 'system') {
        websocketService.notifyUsers(new BasicResponse(responseMessageType, triggeredBy, cachedRoom.toPublicDTO()), cachedRoom.connections);
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