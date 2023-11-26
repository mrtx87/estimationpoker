import {defineStore} from 'pinia';
import {ConnectionState} from "@/services/websocket-service";
import {APP_STATE} from "@/constants/vue-constants";

export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: {},
            _globalCookie: null,
            _overlayId: 0,
            _connectionState: ConnectionState.DISCONNECTED,
            _roomId: '',
            _state: APP_STATE.NO_ROOM_ENTERED
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
        },
        setState(state: number) {
            this._state = state;
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