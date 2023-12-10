import {AuthenticatedRequest} from "../model/authenticated-request.model";
import {BasicRequest} from "../model/basic-request.model";
import {
    EXISTING_ROLES,
    RequestMessageType,
    ResponseMessageType,
    ROLE,
    SYSTEM_USER_ID,
    VOTING_STATE
} from "../constants/global";
import {
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
import {VoteValue} from "../model/vote-value";

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
            authorize: this.getRolePredicament([ROLE.PLAYER, ROLE.MODERATOR, ROLE.OBSERVER])
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
            authorize: this.getRequestingUserIdentityPredicate()
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
            authorize: this.getRequestingUserIdentityPredicate()
        }).addWebsocketEndpoint({
            type: RequestMessageType.CHANGE_ROLE,
            action: this.changeRole.bind(this),
            authorize: this.getRequestingUserIdentityPredicate()
        }).addWebsocketEndpoint({
            type: RequestMessageType.VOTE_REQUEST,
            action: this.userVote.bind(this),
            authorize: this.getRolePredicament([ROLE.PLAYER])
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
                    if (!cachedRoom) {
                        websocketService.notifyUser(new BasicResponse(ResponseMessageType.ROOM_NOT_EXISTING), connection);
                        return;
                    }
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
            logger.error(e);
        }
    }

    getAuthenticatedUser(userId: string, cachedRoom: CachedEstimationPokerRoom) {
        return cachedRoom.users.find(u => u.id === userId);
    }

    async finalizeJoin(cachedRoom: CachedEstimationPokerRoom, joiningUserId: string, request: AuthenticatedRequest, connection: any) {
        try {
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
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_FINALIZING_JOIN), connection);
            logger.error(e);
        }
    }

    ping(cachedRoom: CachedEstimationPokerRoom, userId: string, request: AuthenticatedRequest, connection: any) {
        logger.log(`${request.type} : ${userId} [roomId: ${cachedRoom.id}]`);
    }

    revealVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            cachedRoom.currentEstimation.state = VOTING_STATE.REVEALED;
            //cachedRoom.currentEstimation.votes = cachedRoom.currentEstimation.votes.filter(vote => cachedRoom.connections.find(c => c.userId === vote.userId));
            cachedRoom.currentEstimation.votes = cachedRoom.currentEstimation.votes
                .filter(vote => cachedRoom.connections.find(c => c.userId === vote.userId))
                .filter(vote => cachedRoom.getUser(vote.userId)?.roles.includes(ROLE.PLAYER));
            cachedRoom.currentEstimation.evaluation.amountOfVotes = cachedRoom.currentEstimation.votes.length;
            cachedRoom.currentEstimation.evaluation.avg = this.calculateAverage(cachedRoom.currentEstimation.votes);
            cachedRoom.currentEstimation.evaluation.valuesByAmount = this.generateValuesByAmount(cachedRoom.currentEstimation.votes);
            cachedRoom.currentEstimation.evaluation.deviation = this.calculateDeviation(cachedRoom.currentEstimation.votes, cachedRoom.currentEstimation.evaluation.avg)
            cachedRoom.currentEstimation.timer.stopTimer();
            this.notifyAllUsersAboutUpdate(ResponseMessageType.REVEALED_VOTES, cachedRoom.currentEstimation, cachedRoom.connections, userId);
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_REVEALING_VOTES), connection);
            logger.error(e);
        }
    }

    resetVotes(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            cachedRoom.currentEstimation.state = VOTING_STATE.VOTING;
            cachedRoom.currentEstimation.reset();
            cachedRoom.currentEstimation.timer.startTimer();
            this.notifyAllUsersAboutUpdate(ResponseMessageType.RESETED_VOTES, cachedRoom.currentEstimation, cachedRoom.connections, userId);
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_REVEALING_VOTES), connection);
            logger.error(e);
        }
    }

    async nextEstimation(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            const previousEstimation = cachedRoom.currentEstimation;
            previousEstimation.state = VOTING_STATE.CLOSED;
            previousEstimation.timer.stopTimer();
            cachedRoom.estimationCount += 1;
            estimationService.saveEstimation(previousEstimation);
            const nextEstimation = await estimationService.createEstimation(cachedRoom);
            cachedRoom.setEstimation(nextEstimation);
            this.notifyAllUsersAboutUpdate(ResponseMessageType.NEXT_ESTIMATION, nextEstimation, cachedRoom.connections, userId);
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_GENERATING_NEXT_ESTIMATION), connection);
            logger.error(e);
        }
    }

    deleteRoom(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
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
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_DELETING_ROOM), connection);
            logger.error(e);
        }
    }

    deleteUser(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            return userService.deleteUser(request.data.userId).then(deleteSuccess => {
                if (deleteSuccess) {
                    cachedRoom.removeUser(request.data.userId);
                    websocketService.notifyUsers(new BasicResponse(ResponseMessageType.USER_DELETED, SYSTEM_USER_ID, request.data), cachedRoom.connections);
                    return;
                }
                websocketService.notifyUser(new BasicResponse(ResponseMessageType.USER_NOT_EXISTING, SYSTEM_USER_ID, request.data), connection);
            });
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_DELETING_USER), connection);
            logger.error(e);
        }
    }

    changeRole(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            if(!Array.isArray(request.data)) {
                return;
            }
            const appliedRoles = request.data.filter((receivedRole: string) => EXISTING_ROLES.includes(receivedRole));
            if(appliedRoles.length === 0) {
                return;
            }
            const user = cachedRoom.getUser(userId);
            user.roles = appliedRoles;
            userService.updateUser(user).then(user => {
                this.notifyAllUsersAboutUpdate(ResponseMessageType.CHANGED_USER_ROLE, user, cachedRoom.connections, userId);
            }, e => websocketService.notifyUser(new BasicResponse(ResponseMessageType.USER_NOT_EXISTING), connection));
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_CHANGING_ROLE), connection);
            logger.error(e);
        }
    }

    changeAvatar(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            const newAvatar = request.data;
            const user = cachedRoom.users.find(u => u.id === userId);
            user.avatar = newAvatar;
            userService.updateUser(user);
            this.notifyAllUsersAboutUpdate(ResponseMessageType.AVATAR_CHANGED, user, cachedRoom.connections, userId);
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_CHANGING_AVATAR), connection);
            logger.error(e);
        }
    }

    changeUsername(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            const userName = request.data;
            const user = cachedRoom.getUser(userId);
            user.name = userName;
            userService.updateUser(user);
            this.notifyAllUsersAboutUpdate(ResponseMessageType.CHANGED_USER_NAME, user, cachedRoom.connections, userId);
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_CHANGING_USER_NAME), connection);
            logger.error(e);
        }
    }

    changeRoomSettings(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            cachedRoom.roomSettings = RoomSettings.of(request.data);
            this.notifyAllUsersAboutUpdate(ResponseMessageType.UPDATED_ROOM_SETTINGS, cachedRoom.roomSettings, cachedRoom.connections, userId);
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_CHANGING_ROOM_SETTINGS), connection);
            logger.error(e);
        }
    }

    changeEstimationTitle(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            if (cachedRoom.currentEstimation.id === request.data.estimationId) {
                cachedRoom.currentEstimation.title = request.data.title;
                this.notifyAllUsersAboutUpdate(ResponseMessageType.ESTIMATION_TITLE_UPDATED, {estimationTitle: cachedRoom.currentEstimation.title}, cachedRoom.connections, userId);
            }
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_CHANGING_ESTIMATION_TITLE), connection);
            logger.error(e);
        }
    }

    userVote(cachedRoom: CachedEstimationPokerRoom, userId: string, request: BasicRequest, connection: any) {
        try {
            if (cachedRoom.currentEstimation.state !== VOTING_STATE.CLOSED && cachedRoom.currentEstimation.state === VOTING_STATE.VOTING) {
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

                const observerConnections = cachedRoom.getAllConnectionsByRole(ROLE.OBSERVER);
                const otherConnections = cachedRoom.getAllConnectionsWithoutRole(ROLE.OBSERVER);

                this.notifyAllUsersAboutUpdate(ResponseMessageType.USER_VOTED, cachedRoom.getVotes(), observerConnections);
                this.notifyAllUsersAboutUpdate(ResponseMessageType.USER_VOTED, maskVoteValues(cachedRoom.getVotes()), otherConnections);
            }
        } catch (e) {
            websocketService.notifyUser(new BasicResponse(ResponseMessageType.ERROR_PROCESSING_USER_VOTE), connection);
            logger.error(e);
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

    private getRequestingUserIdentityPredicate() {
        return (user: User, connection: any) => user.id === connection.userId;
    }

    private notifyAllUsersAboutUpdate(responseMessageType: string, data: any, connections: any[], triggeredBy: string = 'system',) {
        websocketService.notifyUsers(new BasicResponse(responseMessageType, triggeredBy, data), connections);
    }

    private calculateAverage(votes: Vote[]) {
        const legitValues = votes
            .map(vote => vote.value)
            .filter(value => value.numericValue >= 0);

        if (legitValues.length === 0) {
            return 0;
        }

        const sumOfVotes = legitValues.reduce((sum: number, voteValue: VoteValue) =>
                sum + voteValue.numericValue
            , 0);

        return this.roundBy2Digits(sumOfVotes / legitValues.length);
    }

    private calculateDeviation(votes: Vote[], avg: number) {
        const legitVotes = votes
            .filter(vote => vote.value.numericValue >= 0);

        if (legitVotes.length === 0) {
            return 0;
        }
        const sum = legitVotes
            .map(vote => Math.pow(vote.value.numericValue - avg, 2))
            .reduce((sum: number, currValue: number) => {
                sum += currValue;
                return sum;
            }, 0);

        return this.roundBy2Digits(Math.sqrt(sum / legitVotes.length));
    }

    private generateValuesByAmount(votes: Vote[]) {
        let valuesByAmount: ValueByAmount[] = [];
        for (let vote of votes) {
            const valueByAmount = valuesByAmount.find(element => element.voteValue.label === vote.value.label);
            if (!valueByAmount) {
                valuesByAmount.push(new ValueByAmount({voteValue: vote.value, amount: 1}));
            } else {
                valueByAmount.amount += 1;
            }
        }
        return valuesByAmount;
    }

    private roundBy2Digits(value: number) {
        const hundredTimes = value * 100;
        const rounded = Math.round(hundredTimes);
        return rounded / 100;
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