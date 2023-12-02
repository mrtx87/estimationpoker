import {defineStore} from 'pinia';
import {ConnectionState} from "@/services/websocket-service";
import {APP_STATE, DISPLAY_OVERLAY_STATE, Roles} from "@/constants/vue-constants";

export const useAppStateStore = defineStore('AppStore', {
    state: () => {
        return {
            // states to reset after login
            _toast: null,
            _localUserId: '',
            _room: null,
            _avatar: null,
            _overlayId: DISPLAY_OVERLAY_STATE.NO_OVERLAY,
            _connectionState: ConnectionState.DISCONNECTED,
            _roomId: '',
            _state: APP_STATE.NO_ROOM_ENTERED,
            _pendingRedirect: null,
            _localVoteValue: '',
            _estimationHistory: []
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
        },
        setLocalVoteValue(value: string) {
            this._localVoteValue = value;
        },
        setEstimationHistory(estimationHistory: any) {
            this._estimationHistory = estimationHistory;
        },
        addToastImpl(toast: any) {
            this._toast = toast;
        },
        getUser(userId: string) {
          this._room ? this.users.find((u: any) => u.id === userId) : null;
        },
        reset() {
            this._localUserId = ''
            this._room = null
            this._avatar = null
            this._overlayId = DISPLAY_OVERLAY_STATE.NO_OVERLAY
            //this._roomId = ''
            this._state = APP_STATE.NO_ROOM_ENTERED
            this._pendingRedirect = null
            this._localVoteValue = ''
            this._estimationHistory = []
        },
    },
    getters: {
        localUserId: (state: any) => state._localUserId,
        localUser: (state: any) => state._room && state._localUserId ? state._room.users.find((u: any) => u.id === state._localUserId) : null,
        room: (state: any) => state._room,
        users: (state: any) => state._room ? state._room.users : [],
        avatar: (state: any) => state._avatar,
        overlayId: (state: any) => state._overlayId,
        connectionState: (state: any) => state._connectionState,
        roomId: (state: any) => state._roomId,
        pendingRedirect: (state: any) => state._pendingRedirect,
        state: (state: any) => state._state,
        localVoteValue: (state: any) => state._localVoteValue,
        estimationHistory: (state: any) => state._estimationHistory,
        sortedEstimationHistory: (state: any) => {
            const history = state._estimationHistory;
            history.sort((a: any, b: any) => {
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
                return 0;
            })
            return history;
        },
        isLocalUserModerator: (state: any) => {
            return state.localUser?.roles.includes(Roles.MODERATOR)
        },
        toast: (state: any) => state._toast,

    }
});