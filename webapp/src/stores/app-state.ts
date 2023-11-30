import {defineStore} from 'pinia';
import {ConnectionState} from "@/services/websocket-service";
import {APP_STATE, DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";

export const useAppStateStore = defineStore('AppStore', {
    state: () => {
        return {
            // states to reset after login
            _localUserId: '',
            _room: null,
            _avatar: null,
            _overlayId: DISPLAY_OVERLAY_STATE.NO_OVERLAY,
            _connectionState: ConnectionState.DISCONNECTED,
            _roomId: '',
            _state: APP_STATE.NO_ROOM_ENTERED,
            _pendingRedirect: null
        }
    },
    actions: {
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
        },
        setRoom(room: any) {
            this._room = room;
        },
        setLocalUserId(userId: string) {
            this._localUserId = userId;
        }
    },
    getters: {
        localUserId: (state: any) => state._localUserId,
        localUser: (state: any) => state._room && state._localUserId? state._room.users.find((u: any) => u.id === state._localUserId) : null,
        room: (state: any) => state._room,
        avatar: (state: any) => state._avatar,
        overlayId: (state: any) => state._overlayId,
        connectionState: (state: any) => state._connectionState,
        roomId: (state: any) => state._roomId,
        pendingRedirect: (state: any) => state._pendingRedirect,
        state: (state: any) => state._state,
    }
});