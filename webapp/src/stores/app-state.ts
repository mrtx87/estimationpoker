import {defineStore} from 'pinia';

export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: null,
            _globalCookie: null,
            _overlayId: 0,
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
        }
    },
    getters: {
        localUser: (state: any) => state._localUser,
        globalCookie: (state: any) => state._globalCookie,
        overlayId: (state: any) => state._overlayId,
    }
});