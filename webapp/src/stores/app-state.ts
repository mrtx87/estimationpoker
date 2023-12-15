import {defineStore} from 'pinia';
import {DISPLAY_OVERLAY_STATE, Roles} from "@/constants/vue-constants";

export const useAppStateStore = defineStore('AppStore', {
    state: () => {
        return {
            _toast: null,
            _isOnRoomRoute: false,
            _roomId: '',
            _overlayId: DISPLAY_OVERLAY_STATE.NO_OVERLAY,
            //need to be reset
            _localUserId: '',
            _room: null,
            _localVoteValue: '',
            _estimationHistory: [],
            _roomPreviews: [],
            _screenDimensions: {width: 0, height: 0},
            _langKey: 'de',
            _prompt: null
        }
    },
    actions: {
        setOverlayId(overlayId: number) {
            this._overlayId = overlayId;
        },
        setRoomId(roomId: string) {
            this._roomId = roomId;
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
        setIsOnRoomRoute(value: boolean) {
            this._isOnRoomRoute = value;
        },
        reset() {
            this._localUserId = '';
            this._room = null;
            this._localVoteValue = '';
            this._estimationHistory = [];
            this._roomPreviews = [];
            this._prompt = null;
        },
        setRoomPreviews(roomPreviews: any) {
            this._roomPreviews = roomPreviews;
        },
        setScreenDimensions(dimensions: any) {
            this._screenDimensions = dimensions;
        },
        setLangKey(langKey: string) {
            this._langKey = langKey;
        },
        setPrompt(prompt: any) {
            this._prompt = prompt;
        }
    },
    getters: {
        isOnRoomRoute: (state: any) => state._isOnRoomRoute,
        localUserId: (state: any) => state._localUserId,
        localUser: (state: any) => state._room && state._localUserId ? state._room.users.find((u: any) => u.id === state._localUserId) : null,
        room: (state: any) => state._room,
        users: (state: any) => state._room ? state._room.users : [],
        overlayId: (state: any) => state._overlayId,
        roomId: (state: any) => state._roomId,
        localVoteValue: (state: any) => state._localVoteValue,
        estimationHistory: (state: any) => state._estimationHistory,
        screenDimensions: (state: any) => state._screenDimensions,
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
        roomPreviews: (state: any) => state._roomPreviews,
        langKey: (state: any) => state._langKey,
        prompt: (state: any) => state._prompt
    }
});