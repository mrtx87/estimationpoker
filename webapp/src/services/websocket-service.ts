import {getCookie} from "@/services/cookie-service";
import {isLocalHost, Logger} from "@/services/util";
import {AuthenticatedRequest} from "@/model/authenticated-request.model";
import {APP_STATE, DISPLAY_OVERLAY_STATE, ResponseMessageTypes} from "@/constants/vue-constants";


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

    pingTimeout: any;

    registerStore(appState: any): void {
        this.store = appState;
    }

    establishConnection(): boolean {
        if(this.wsConnection) {
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
        if(this.wsConnection) {
            const token = getCookie(this.store.roomId);
            Logger.warn('send ping');
            const pingData = {ping: 1}
            this.sendMessage(new AuthenticatedRequest({
                type: 'ping',
                token: token,
                data: null
            }));
            this.initPing();
        }
    }

    sendFinalizeJoinRequest(roomId: string) {
        const token = getCookie(roomId);
        const joinRequest = new AuthenticatedRequest({
            type: 'finalize-join',
            token: token,
            data: null
        });
        this.store.setState(APP_STATE.JOINING_ROOM);
        this.sendMessage(joinRequest);
    }

    onError(error: any): void {
        console.error("websocket server could not be reached");
        this.store.setConnectionState(ConnectionState.CONNECTION_NOT_POSSIBLE);
        this.handleReconnect();
    }

    onCloseConnection(): void {
        console.error("websocket connection closed");
        this.store.setConnectionState(ConnectionState.DISCONNECTED);
        this.handleReconnect();
    }

    handleReconnect() {
        if (this.reconnectRetryLeft()) {
            this.retries += 1;
            console.log("retry connecting... retries left:" + (MAX_RECONNECT_RETRIES - this.retries));
            this.establishConnection();
        }else{
            this.store.setConnectionState(ConnectionState.CONNECTION_NOT_POSSIBLE);
            console.error("connection to websocket server seems not possible at this time");
        }
    }

    reconnectRetryLeft() {
        return this.retries < MAX_RECONNECT_RETRIES;
    }

    sendMessage(data: any): void {
        Logger.log('>>>', data)
        this.wsConnection?.send(JSON.stringify(data));
        this.initPing();
    }

    finalizeJoinRoom(roomId: string) {
        const establishing = this.establishConnection();
        if (!establishing) {
            this.sendFinalizeJoinRequest(roomId);
        }
    }

    onReceiveMessage(response: { data: string; }): void {
        try {
            const message = JSON.parse(response.data);
            if(!message.type) {
                Logger.error('Error: No Response Type received', message);
            }
            switch(message.type) {
                case ResponseMessageTypes.JOINED_GAME_SESSION: {
                     console.log(message)
                    this.store.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
                }
                break;
                default: Logger.error('Error: Unknown Response Type: ' + message.type);
            }
        } catch (e) {
            Logger.warn(e, "Invalid JSON: ", response.data);
            return;
        }
    }
}