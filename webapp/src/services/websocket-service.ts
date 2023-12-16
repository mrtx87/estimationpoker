import {getCookie, refreshRoomCookie, removeCookie} from "@/services/cookie-service";
import {isLocalHost, Logger} from "@/services/util";
import {AuthenticatedRequest} from "@/model/authenticated-request.model";
import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, ResponseMessageType} from "@/constants/vue-constants";
import {AppService} from "@/services/app-service";
import {restService, SERVER_NOT_REACHABLE, TRYING_RECONNECT} from "@/services/rest-service";
import {router} from "@/main";
import {languageService} from "@/services/language";


const MAX_RECONNECT_RETRIES = 3;

export class WebsocketService {
    retries = 0;
    wsConnection: WebSocket | null = null;
    store: any = null;
    appService: AppService | undefined;

    pingTimeout: any;

    tl8(key: string, vars: any = null) {
        return languageService.t(key, this.store.langKey, vars);
    }

    registerStore(appStore: any): void {
        this.store = appStore;
    }

    registerAppService(appService: AppService) {
        this.appService = appService;
    }

    establishConnection(): boolean {
        if (this.wsConnection) {
            Logger.log('websocket connection already established')
            return false;
        }
        const domWindow: any = window;
        window.WebSocket = domWindow.WebSocket || domWindow.MozWebSocket;

        let address = 'wss://v2202005121049117361.nicesrv.de';
        if (isLocalHost()) {
            address = 'ws://localhost:8085';
        }
        Logger.log(`establishing connection to ${address}`);
        this.wsConnection = new WebSocket(`${address}/estimation_poker_websocket`);
        this.wsConnection.onopen = this.onOpenConnection.bind(this);
        this.wsConnection.onerror = this.onError.bind(this);
        this.wsConnection.onmessage = this.onReceiveMessage.bind(this);
        this.wsConnection.onclose = this.onCloseConnection.bind(this);
        return true;
    }

    onOpenConnection(e: any) {
        Logger.log("websocket successfully connected");
        this.retries = 0;
        if (this.store.roomId) {
            this.sendFinalizeJoinRequest(this.store.roomId);
        }
        this.initPing();
    }

    initPing() {
        clearTimeout(this.pingTimeout)
        this.pingTimeout = setTimeout(this.sendPing.bind(this), 45000);
    }

    sendPing() {
        if (this.wsConnection) {
            Logger.warn('send ping');
            this.sendAuthenticatedRequest('ping');
            this.initPing();
        }
    }

    sendFinalizeJoinRequest(roomId: string) {
        this.store.reset();
        this.sendAuthenticatedRequest('finalize-join', null, roomId);
    }

    sendAuthenticatedRequest(type: string, data: any = null, roomId = '') {
        const token = getCookie(roomId ? roomId : this.store.room.id);
        const joinRequest = new AuthenticatedRequest({
            type: type,
            token: token,
            data: data
        });
        this.sendMessage(joinRequest);
    }

    onError(error: any): void {
        console.error("websocket server could not be reached");
        this.wsConnection = null;
        setTimeout(this.handleReconnect.bind(this), 1000);
    }

    onCloseConnection(): void {
        this.wsConnection = null;
        console.error("websocket connection closed");
    }

    handleReconnect() {
        if (!this.appService?.isOnRoomRoute()) {
            return;
        }
        if (this.reconnectRetryLeft()) {
            this.retries += 1;
            console.log("retry connecting... retries left:" + (MAX_RECONNECT_RETRIES - this.retries));
            this.store.toast.info(TRYING_RECONNECT);
            this.establishConnection();
        } else {
            this.store.toast.error(SERVER_NOT_REACHABLE);
        }
    }

    reconnectRetryLeft() {
        return this.retries < MAX_RECONNECT_RETRIES;
    }

    sendMessage(data: AuthenticatedRequest | any): void {
        Logger.log('>>>', data)
        this.wsConnection?.send(JSON.stringify(data));
        this.initPing();
    }

    sendFinalizeJoinRoom(roomId: string) {
        const token = getCookie(roomId);
        restService.setHeaderConfig(token);
        const establishing = this.establishConnection();
        if (!establishing) {
            this.sendFinalizeJoinRequest(roomId);
        }
    }

    /** handle responses **/

    onRoomJoinFinalizeResponse(message: any) {
        const receivedRoom = message.data.room;
        refreshRoomCookie(receivedRoom.id);
        this.store.setLocalUserId(message.sender);
        this.store.setRoom(receivedRoom);
        this.store.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
        const joiningUserVote = message.data.vote;
        if (joiningUserVote) {
            this.store.setLocalVoteValue(joiningUserVote.value)
        }
        restService.sendPostRequest('/estimation-history', null).then((request: {
            data: any;
        }) => this.store.setEstimationHistory(request.data));
        this.store.toast.info(this.tl8(message.type));
    }

    onOtherUserJoinedRoom(message: any) {
        const room = this.store.room;
        const joiningUser = message.data;
        room.users = [...room.users.filter((u: any) => u.id !== joiningUser.id), joiningUser];
        room.connections = [...room.connections.filter((uid: any) => uid !== joiningUser.id), joiningUser.id];
        this.store.setRoom({...room});
        this.store.toast.info(this.tl8(message.type, [joiningUser.name]));
    }

    onUserDisconnectRoom(message: any) {
        const room = this.store.room;
        room.connections = room.connections.filter((uid: string) => uid !== message.sender);
        this.store.setRoom({...room});
        const user = this.store.getUser(message.sender);
        this.store.toast.info(this.tl8(message.type, [user.name]));
    }

    updateRoom(message: any, updateMethod: (response: any, room: any) => void) {
        const room = {...this.store.room};
        updateMethod(message, room);
        return this.store.setRoom(room);
    }

    onReceiveMessage(response: { data: any }): void {
        try {
            const message = JSON.parse(response.data);
            Logger.log('<<<');
            Logger.log(message);
            if (!message.type) {
                Logger.error('Error: No Response Type received', message);
                return;
            }
            switch (message.type) {
                case ResponseMessageType.JOINED_ESTIMATION_SESSION:
                    return this.onRoomJoinFinalizeResponse(message);
                case ResponseMessageType.USER_DISCONNECTED:
                    return this.onUserDisconnectRoom(message);
                case ResponseMessageType.ANOTHER_USER_JOINED_SESSION:
                    return this.onOtherUserJoinedRoom(message);
                case ResponseMessageType.REVEALED_VOTES: {
                    return this.updateRoom(message, (message, room) => {
                        room.currentEstimation = message.data;
                    });
                }
                case ResponseMessageType.RESETED_VOTES: {
                    return this.updateRoom(message, (message, room) => {
                        room.currentEstimation = message.data;
                        this.store.setLocalVoteValue('');
                    });
                }
                case ResponseMessageType.NEXT_ESTIMATION: {
                    return this.updateRoom(message, (message, room) => {
                        room.currentEstimation = message.data;
                        this.store.setLocalVoteValue('');
                        restService.sendPostRequest('/estimation-history', null)
                            .then((request: { data: any; }) => this.store.setEstimationHistory(request.data));
                    });
                }
                case ResponseMessageType.ESTIMATION_TITLE_UPDATED: {
                    return this.updateRoom(message, (message, room) => {
                        room.currentEstimation.title = message.data.estimationTitle;
                    });
                }
                case ResponseMessageType.CHANGED_USER_ROLE:
                case ResponseMessageType.CHANGED_USER: {
                    return this.updateRoom(message, (message, room) => {
                        const updatedUser = message.data;
                        room.users = [...room.users.filter((u: any) => u.id !== message.data.id), updatedUser];
                    });
                }
                case ResponseMessageType.UPDATED_ROOM_SETTINGS: {
                    const roomSettings = message.data;
                    const room = {...this.store.room, roomSettings}
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.USER_VOTED: {
                    return this.updateRoom(message, (message, room) => {
                        const votes = message.data;
                        const currentEstimation = room.currentEstimation;
                        currentEstimation.votes = votes;
                    });
                }
                case ResponseMessageType.ROOM_DELETED : {
                    const room = this.store.room;
                    const sender = room.users.find((u: any) => u.id === message.sender);
                    router.push(HOME_ROUTE);
                    return this.store.toast.info(this.tl8(message.type, [message.data.title, sender.name]), {timeout: 6000});
                }
                case ResponseMessageType.ROOM_NOT_EXISTING : {
                    router.push(HOME_ROUTE);
                    return this.store.toast.warning(this.tl8(message.type));
                }
                case ResponseMessageType.USER_DELETED: {
                    const deletedUserId = message.data.userId;
                    const room = {...this.store.room}
                    const deletedUser = room.users.find((u: any) => u.id === deletedUserId);
                    if (deletedUser.id === this.store.localUserId) {
                        this.store.reset();
                        router.push(HOME_ROUTE);
                        return this.store.toast.warning(this.tl8(message.type, [deletedUser.name]));
                    }
                    room.users = room.users.filter((u: any) => u.id !== deletedUserId);
                    this.store.setRoom(room);
                    return this.store.toast.warning(this.tl8(message.type, [deletedUser.name]));
                }
                case ResponseMessageType.ACTION_UNKNOWN : {
                    return this.store.toast.warning(this.tl8(message.type));
                }
                case ResponseMessageType.UNKNOWN_USER: {
                    router.push(HOME_ROUTE);
                    return this.store.toast.error(this.tl8(message.type));
                }
                case ResponseMessageType.ERROR_PROCESSING_USER_VOTE :
                case ResponseMessageType.ERROR_CHANGING_ESTIMATION_TITLE :
                case ResponseMessageType.ERROR_CHANGING_ROOM_SETTINGS :
                case ResponseMessageType.ERROR_CHANGING_USER :
                case ResponseMessageType.ERROR_CHANGING_ROLE :
                case ResponseMessageType.ERROR_DELETING_USER :
                case ResponseMessageType.ERROR_DELETING_ROOM :
                case ResponseMessageType.ERROR_FINALIZING_JOIN :
                case ResponseMessageType.ERROR_RESETTING_VOTES :
                case ResponseMessageType.ERROR_REVEALING_VOTES :
                case ResponseMessageType.ERROR_GENERATING_NEXT_ESTIMATION : {
                    return this.store.toast.error(this.tl8(message.type));
                }
                default:
                    Logger.error('Error: Unknown Response Type: ' + message.type);
            }
        } catch (e) {
            Logger.warn(e, "Invalid JSON: ", response.data);
            return;
        }
    }
}