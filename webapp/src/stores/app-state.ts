import {defineStore} from 'pinia';
import {ConnectionState} from "@/services/websocket-service";

export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: {},
            _globalCookie: null,
            _overlayId: 0,
            _connectionState: ConnectionState.DISCONNECTED,
            _roomId: ''
        }
    },
    actions: {
        setRouter(localUser: any) {
            this._localUser = localUser;
        },
        addGlobalCookie(globalCookie: any) {
            this._globalCookie = globalCookie;
        },
        setOverlayId(overlayId: number) {
            this._overlayId = overlayId;
        },
        setConnectionState(state: ConnectionState) {
            this._connectionState = state;
        },
        setRoomId(roomId: string) {
            this._roomId = roomId;
        }
    },
    getters: {
        localUser: (state: any) => state._localUser,
        globalCookie: (state: any) => state._globalCookie,
        overlayId: (state: any) => state._overlayId,
        connectionState: (state: any) => state._connectionState,
        roomId: (state: any) => state._roomId,
    }
});