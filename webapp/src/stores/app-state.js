import {defineStore} from 'pinia';



export const useAppStateStore = defineStore('AppState', {
    state: () => {
        return {
            // states to reset after login
            _localUser: null,
        }
    },
    actions: {
        setRouter(router) {
            this._router = router;
        }
    },
    getters: {
        localUser: (state) => state._localUser,
    }
});