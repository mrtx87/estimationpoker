import {defineStore} from 'pinia';

export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: null,
            _globalCookie: null
        }
    },
    actions: {
        setRouter(localUser: any) {
            this._localUser = localUser;
        },
        addGlobalCookie(globalCookie: any) {
            this._globalCookie = globalCookie;
        }
    },
    getters: {
        localUser: (state: any) => state._localUser,
        globalCookie: (state: any) => state._globalCookie,
    }
});