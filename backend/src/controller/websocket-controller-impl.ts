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
import {RoomSettings} from "../model/room-settings";
import {Vote} from "../model/vote";
import {maskVoteValues} from "../util/util";
import {ValueByAmount} from "../model/value-by-number";

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
        }).addWebsocketEndpoint({
            type: RequestMessageType.VOTE_REQUEST,
            action: this.userVote.bind(this),
            authorize: this.getRolePredicament([ROLE.PARTICIPANT])
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
                    const authenticatedUser = this.getAuthenticatedUser(authenticated.userId, cachedRoom);
                    if (!authenticatedUser) {
                        websocketService.notifyUser(new BasicResponse(ResponseMessageType.REMOVED_FROM_ROOM), connection);
                        return;
                    }

                    if (!endPoint.authorize(authenticatedUser, connection)) {
                        websocketService.notifyUser(new BasicResponse(ResponseMessageType.NOT_PERMITTED), connection);
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
        if (connection.userId && connection.roomId) {
            estimationRoomService.processDisconnectClient(connection);
        }

        connection.userId = joiningUserId;
        connection.roomId = cachedRoom.id;
        logger.info(`user ${joiningUserId} joined room: ${cachedRoom.id}`);
        cachedRoom.addConnection(connection);

        websocketService.notifyUser(new BasicResponse(ResponseMessageType.JOINED_ESTIMATION_SESSION, joiningUserId, {
            room: cachedRoom.toPublicDTO(joiningUserId),
            vote: cachedRoom.getVotes().find(v => v.userId === joiningUserId)
        }), connection);
        websocketService.notifyUsers(new BasicResponse(ResponseMessageType.ANOTHER_USER_JOINED_SESSION, joiningUserId, cachedRoom.getUser(joiningUserId)), cachedRoom.connections.filter(c => c.userId !== joiningUserId));
    }

    ping(cachedRoom: CachedEstimationPokerRoom, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    revealVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        cachedRoom.currentEstimation.state = VOTING_STATE.REVEALED;
        cachedRoom.currentEstimation.evaluation.amountOfVotes = cachedRoom.currentEstimation.votes.length;
        cachedRoom.currentEstimation.evaluation.avg = this.calculateAverage(cachedRoom.currentEstimation.votes);
        cachedRoom.currentEstimation.evaluation.valuesByAmount = this.generateValuesByAmount(cachedRoom.currentEstimation.votes);
        cachedRoom.currentEstimation.evaluation.deviation = this.calculateDeviation(cachedRoom.currentEstimation.evaluation.valuesByAmount, cachedRoom.currentEstimation.evaluation.avg)

        this.notifyAllUsersAboutUpdate(ResponseMessageType.REVEALED_VOTES, cachedRoom.currentEstimation, cachedRoom.connections, userId);
    }

    calculateAverage(votes: Vote[]) {
        const legitValues = votes
            .map(vote => Number(vote.value))
            .filter(convertedValue => !isNaN(convertedValue));

        const sumOfVotes = legitValues.reduce((sum: number, convertedValue: number) =>
            sum + convertedValue
        , 0);

        return sumOfVotes / legitValues.length;
    }

    calculateDeviation(votes: any[], avg: number) {
        const legitVotes = votes
            .filter(vote => !isNaN(Number(vote.value)));
        const sum = legitVotes
            .map(vote => Math.pow(Number(vote.value) - avg, 2))
            .reduce((sum: number, currValue: number) => {
                sum += currValue;
                return sum;
            }, 0);

        return sum / legitVotes.length;
    }

    generateValuesByAmount(votes: any[]) {
        let valuesByAmount: ValueByAmount[] = [];
        for (let vote of votes) {
            const valueByAmount = valuesByAmount.find(element => element.value === vote.value);
            if (!valueByAmount) {
                valuesByAmount.push(new ValueByAmount({value: vote.value, amount: 1}));
            } else {
                valueByAmount.amount += 1;
            }
        }
        return valuesByAmount;
    }

    resetVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        cachedRoom.currentEstimation.state = VOTING_STATE.VOTING;
        cachedRoom.currentEstimation.votes = [];
        this.notifyAllUsersAboutUpdate(ResponseMessageType.RESETED_VOTES, VOTING_STATE.VOTING, cachedRoom.connections, userId);
    }

    async nextEstimation(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        const previousEstimation = cachedRoom.currentEstimation;
        previousEstimation.state = VOTING_STATE.CLOSED;
        cachedRoom.estimationCount += 1;
        estimationService.saveEstimation(previousEstimation);
        const nextEstimation = await estimationService.createEstimation(cachedRoom);
        cachedRoom.setEstimation(nextEstimation);
        this.notifyAllUsersAboutUpdate(ResponseMessageType.NEXT_ESTIMATION, nextEstimation, cachedRoom.connections, userId);
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
        const user = cachedRoom.getUser(userId);
        const roles = request.data;
        user.roles = roles;
        userService.updateUser(user);
        this.notifyAllUsersAboutUpdate(ResponseMessageType.CHANGED_USER_ROLE, user, cachedRoom.connections, userId);
    }

    changeAvatar(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        const newAvatar = request.data;
        const user = cachedRoom.users.find(u => u.id === userId);
        user.avatar = newAvatar;
        userService.updateUser(user);
        this.notifyAllUsersAboutUpdate(ResponseMessageType.AVATAR_CHANGED, user, cachedRoom.connections, userId);
    }

    changeUsername(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        const userName = request.data;
        const user = cachedRoom.getUser(userId);
        user.name = userName;
        userService.updateUser(user);
        this.notifyAllUsersAboutUpdate(ResponseMessageType.CHANGED_USER_NAME, user, cachedRoom.connections, userId);
    }

    changeRoomSettings(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        cachedRoom.roomSettings = RoomSettings.of(request.data);
        this.notifyAllUsersAboutUpdate(ResponseMessageType.UPDATED_ROOM_SETTINGS, cachedRoom.roomSettings, cachedRoom.connections, userId);
    }

    changeEstimationTitle(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        if (cachedRoom.currentEstimation.id === request.data.estimationId) {
            cachedRoom.currentEstimation.title = request.data.title;
            this.notifyAllUsersAboutUpdate(ResponseMessageType.ESTIMATION_TITLE_UPDATED, {estimationTitle: cachedRoom.currentEstimation.title}, cachedRoom.connections, userId);
        }
    }

    userVote(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        if (cachedRoom.currentEstimation.state !== VOTING_STATE.CLOSED && (cachedRoom.currentEstimation.state === VOTING_STATE.VOTING || cachedRoom.roomSettings.voteAfterReveal)) {
            if (request.data) {
                const vote = Vote.of(request.data)
                cachedRoom.setVotes([...cachedRoom.getVotes().filter(v => v.userId !== userId), vote]);
            } else {
                cachedRoom.setVotes(cachedRoom.getVotes().filter(v => v.userId !== userId));
            }

            if (cachedRoom.currentEstimation.state === VOTING_STATE.REVEALED) {
                this.notifyAllUsersAboutUpdate(ResponseMessageType.USER_VOTED, cachedRoom.getVotes(), cachedRoom.connections);
                return;
            }

            if (!cachedRoom.roomSettings.realtimeVoting) {
                this.notifyAllUsersAboutUpdate(ResponseMessageType.USER_VOTED, maskVoteValues(cachedRoom.getVotes()), cachedRoom.connections);
                return;
            }

            const moderatorConnections = cachedRoom.getAllConnectionsByRole(ROLE.MODERATOR);
            const otherConnections = cachedRoom.getAllConnectionsWithoutRole(ROLE.MODERATOR);

            this.notifyAllUsersAboutUpdate(ResponseMessageType.USER_VOTED, cachedRoom.getVotes(), moderatorConnections);
            this.notifyAllUsersAboutUpdate(ResponseMessageType.USER_VOTED, maskVoteValues(cachedRoom.getVotes()), otherConnections);
        }
    }


    async preRequestHandling(roomId: string, userId: string, connection: any) {
        const restoredRoom = await estimationRoomService.getCachedRoom(roomId, true);
        if (!restoredRoom) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ROOM_NOT_EXISTING, userId, null), connection);
        }
        return restoredRoom;
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

    private notifyAllUsersAboutUpdate(responseMessageType: string, data: any, connections: any[], triggeredBy: string = 'system',) {
        websocketService.notifyUsers(new BasicResponse(responseMessageType, triggeredBy, data), connections);
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