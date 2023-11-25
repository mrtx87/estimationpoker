import {defineStore} from 'pinia';
import {ConnectionState} from "@/services/websocket-service";

export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: null,
            _globalCookie: null,
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
        connectionState: (state: any) => state._connectionState,
        roomId: (state: any) => state._roomId,
    }
});