import {getCookie, refreshRoomCookie, removeCookie} from "@/services/cookie-service";
import {isLocalHost, Logger} from "@/services/util";
import {AuthenticatedRequest} from "@/model/authenticated-request.model";
import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, ResponseMessageType} from "@/constants/vue-constants";
import {AppService} from "@/services/app-service";
import {restService} from "@/services/rest-service";
import {router} from "@/main";


const MAX_RECONNECT_RETRIES = 3;

export enum ConnectionState {
    PREINIT,
    CONNECTING = 1,
    CONNECTED = 2,
    DISCONNECTED = 3,
    CONNECTION_NOT_POSSIBLE = 4,
    RECONNECTING = 5,
}

export class WebsocketService {
    retries = 0;
    wsConnection: WebSocket | null = null;
    store: any = null;
    appService: AppService | undefined;

    pingTimeout: any;

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
        this.store.setConnectionState(ConnectionState.CONNECTED);
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
            const pingData = {ping: 1}
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
        this.store.setConnectionState(ConnectionState.CONNECTION_NOT_POSSIBLE);
        this.handleReconnect();
    }

    onCloseConnection(): void {
        this.wsConnection = null;
        console.error("websocket connection closed");
        this.store.setConnectionState(ConnectionState.DISCONNECTED);
        this.handleReconnect();
    }

    handleReconnect() {
        if(!this.appService?.isOnRoomRoute()) {
            return;
        }
        if (this.reconnectRetryLeft()) {
            this.retries += 1;
            console.log("retry connecting... retries left:" + (MAX_RECONNECT_RETRIES - this.retries));
            this.establishConnection();
        } else {
            this.store.setConnectionState(ConnectionState.CONNECTION_NOT_POSSIBLE);
            console.error("connection to websocket server seems not possible at this time");
        }
    }

    reconnectRetryLeft() {
        return this.retries < MAX_RECONNECT_RETRIES;
    }

    sendMessage(data: AuthenticatedRequest | any): void {
        if (this.store.connectionState !== ConnectionState.CONNECTED) {
            return;
        }
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
        restService.sendPostRequest('/estimation-history', null).then(request => this.store.setEstimationHistory(request.data));
        this.store.toast.info(`${this.store.localUser.name} has joined the room.`)
    }

    onOtherUserJoinedRoom(message: any) {
        const room = this.store.room;
        const joiningUser = message.data;
        room.users = [...room.users.filter((u: any) => u.id !== joiningUser.id), joiningUser];
        room.connections = [...room.connections.filter((uid: any) => uid !== joiningUser.id), joiningUser.id];
        this.store.setRoom({...room});
        this.store.toast.info(`${joiningUser.name} has joined the room.`)
    }

    onUserDisconnectRoom(message: any) {
        const room = this.store.room;
        room.connections = room.connections.filter((uid: string) => uid !== message.sender);
        this.store.setRoom({...room});
        const user = this.store.getUser(message.sender);
        this.store.toast.info(`${user.name} has left the room.`)
    }

    onReceiveMessage(response: { data: string; }): void {
        try {
            const message = JSON.parse(response.data);
            Logger.log('<<<');
            Logger.log(message);
            if (!message.type) {
                Logger.error('Error: No Response Type received', message);
            }
            switch (message.type) {
                case ResponseMessageType.JOINED_ESTIMATION_SESSION:
                    return this.onRoomJoinFinalizeResponse(message);
                case ResponseMessageType.USER_DISCONNECTED:
                    return this.onUserDisconnectRoom(message);
                case ResponseMessageType.ANOTHER_USER_JOINED_SESSION:
                    return this.onOtherUserJoinedRoom(message);
                case ResponseMessageType.REVEALED_VOTES: {
                    const room = {...this.store.room};
                    room.currentEstimation = message.data;
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.RESETED_VOTES: {
                    const room = {...this.store.room};
                    room.currentEstimation = message.data;
                    this.store.setLocalVoteValue('');
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.NEXT_ESTIMATION: {
                    const room = {...this.store.room};
                    room.currentEstimation = message.data;
                    this.store.setLocalVoteValue('');
                    restService.sendPostRequest('/estimation-history', null)
                        .then(request => this.store.setEstimationHistory(request.data))
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.ESTIMATION_TITLE_UPDATED: {
                    const room = {...this.store.room};
                    room.currentEstimation.title = message.data.estimationTitle;
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.CHANGED_USER_ROLE:
                case ResponseMessageType.CHANGED_USER: {
                    const updatedUser = message.data;
                    const room = {...this.store.room};
                    room.users = [...room.users.filter((u: any) => u.id !== message.data.id), updatedUser];
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.UPDATED_ROOM_SETTINGS: {
                    const roomSettings = message.data;
                    const room = {...this.store.room, roomSettings}
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.USER_VOTED: {
                    const votes = message.data;
                    const currentEstimation = this.store.room.currentEstimation;
                    currentEstimation.votes = votes;
                    const room = {...this.store.room}
                    return this.store.setRoom(room);
                }
                case ResponseMessageType.ROOM_NOT_EXISTING : {
                    return this.store.toast.error('Dieser Raum existiert nicht mehr.');
                }
                case ResponseMessageType.USER_DELETED: {
                    const deletedUserId = message.data.userId;
                    const room = {...this.store.room}
                    const deletedUser = room.users.find((u: any) => u.id === deletedUserId);
                    if(deletedUser.id === this.store.localUserId) {
                        router.push(HOME_ROUTE);
                        this.store.reset();
                        router.push(HOME_ROUTE);
                        return this.store.toast.success(`Your User ${deletedUser.name} was successfully deleted!`);
                    }
                    room.users = room.users.filter((u: any) => u.id !== deletedUserId);
                    this.store.setRoom(room);
                    return this.store.toast.info(`User ${deletedUser.name} has been deleted`);
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