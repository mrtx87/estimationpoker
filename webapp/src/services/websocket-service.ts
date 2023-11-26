import {Store} from "vuex";
import {State} from 'vue'
import {getCookie} from "@/services/cookie-service";
import {GlobalPlayerCookie} from "../model/global-player-cookie.model";
import {isLocalHost, Logger} from "@/services/util";


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

    establishConnection(): void {
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
    }

    onOpenConnection(e: any) {
        Logger.log("websocket successfully connected");
        this.retries = 0;
        this.store.setConnectionState(ConnectionState.CONNECTED);
        if (this.store.roomId) {
            this.sendJoinRequest(this.store.roomId);
        }
        this.initPing();
    }

    initPing() {
        clearTimeout(this.pingTimeout)
        this.pingTimeout = setTimeout(this.sendPing.bind(this), 45000);
    }

    sendPing() {
        if(this.wsConnection) {
            Logger.warn('send ping');
            const pingData = {ping: 1}
            //this.wsConnection?.send(JSON.stringify(pingData));
            this.initPing();
        }
    }

    sendJoinRequest(gameSessionId: string) {
        const playerSessionSecret = getCookie(gameSessionId);
        const joinRequest = {
            type: 'join-game-session',
            data: {
                gameSessionId: gameSessionId,
                secret: playerSessionSecret,
                globalPlayerCookie: new GlobalPlayerCookie(this.store?.getters.globalPlayerCookie)
            }
        };
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

    onReceiveMessage(response: { data: string; }): void {
        try {
            const message = JSON.parse(response.data);
            this.store?.commit('handleIncomingMessage', message);
        } catch (e) {
            Logger.warn(e, "Invalid JSON: ", response.data);
            return;
        }
    }
}