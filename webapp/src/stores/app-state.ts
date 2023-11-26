import {defineStore} from 'pinia';
import {ConnectionState} from "@/services/websocket-service";
import {APP_STATE, DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";

export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: {},
            _avatar: null,
            _overlayId: DISPLAY_OVERLAY_STATE.NO_OVERLAY,
            _connectionState: ConnectionState.DISCONNECTED,
            _roomId: '',
            _state: APP_STATE.NO_ROOM_ENTERED,
            _pendingRedirect: null
        }
    },
    actions: {
        setRouter(localUser: any) {
            this._localUser = localUser;
        },
        addAvatar(avatar: any) {
            this._avatar = avatar;
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
        },
        setPendingRedirect(redirectObj: any) {
            this._pendingRedirect = redirectObj;
        }
    },
    getters: {
        localUser: (state: any) => state._localUser,
        avatar: (state: any) => state._avatar,
        overlayId: (state: any) => state._overlayId,
        connectionState: (state: any) => state._connectionState,
        roomId: (state: any) => state._roomId,
        pendingRedirect: (state: any) => state._pendingRedirect,
    }
});