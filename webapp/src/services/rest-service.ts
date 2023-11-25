import axios from "axios";

export function isLocalHost() {
    return window.location.href.includes('localhost:8080');
}


export const REST_BASE_PATH = isLocalHost() ? 'http://localhost:8085/s9library/api/rest' : 'https://v2202005121049117361.nicesrv.de/s9library/api/rest';// 2MB in bytes

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const SERVER_DOWN = -1;
export const ERROR_CODES_ALLOW_MULTIPLE_BLACKLIST = [UNAUTHORIZED, FORBIDDEN, SERVER_DOWN];

export function headerConfig(token: string) {
    if (token) {
        return {
            headers: {Authorization: `Bearer ${token}`}
        };
    }
    return {};
}


export function wait(ms: number, data: any) {
    return new Promise(resolve => setTimeout(resolve, ms, data));
}

export const restService = {
    appState: null,
    headerConfig: {},
    logoutStatusCodes: [UNAUTHORIZED, FORBIDDEN],
    sendPostRequest: function sendPostRequest(path: string, data: any, blocking = true, authorized = true) {
        if (blocking) {
            const loadingInterception = this.addLoadingInterception(path);
            return axios.post(REST_BASE_PATH + path, data, authorized ? this.headerConfig : {})
                .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception));
        }
        return axios.post(REST_BASE_PATH + path, data, authorized ? this.headerConfig : {})
            .then(response => response, this.errorHandling.bind(this));
    },
    sendGetRequest: function (path: string, blocking = true, authorized = true) {
        if (blocking) {
            const loadingInterception = this.addLoadingInterception(path);
            return axios.get(REST_BASE_PATH + path, authorized ? this.headerConfig : {})
                .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception));
        }
        return axios.get(REST_BASE_PATH + path, authorized ? this.headerConfig : {})
            .then(response => response, this.errorHandling.bind(this));
    },
    sendRefreshTokenRequest: function (tempHeaderConfig: any) {
        const loadingInterception = this.addLoadingInterception(UPDATE_TOKEN_ENDPOINT);
        return axios.get(REST_BASE_PATH + UPDATE_TOKEN_ENDPOINT, tempHeaderConfig)
            .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception))
    },
    setAppState: function (appState: any) {
        this.appState = appState;
    },
    errorHandling: function (error: any) {
        const errorStatus = error?.response?.status;
        this.handleToastOnError(error);
        if (this.logoutStatusCodes.includes(errorStatus)) {
            //this.appState.onLogout();
        }
        return Promise.reject(error);
    },
    errorHandlingOnBlockingResponse: function (loadingInterception: any, error: any) {
        this.clearLoadingInterception(loadingInterception);
        return this.errorHandling(error);
    },
    handleToastOnError: function (error: any) {
        if (!error || !error.response) {
            console.log(error)
            //this.appState.addToast(SERVER_NOT_REACHABLE, 'error', SERVER_DOWN);
        } else if (error.response.data) {
            console.log(error)
            //this.appState.addToast(error.response.data, 'error', error.response.status);
        }
    },
    responseInterception: function (loadingInterception: any, response: any) {
        this.clearLoadingInterception(loadingInterception);
        return response;
    },
    addLoadingInterception: function (path: string, customMessage = null) {
        const loadingInterception = {
            timeoutId: 0,
            message: customMessage || getLoadingText(path),
            path: path,
            id: Date.now()
        };
        loadingInterception.timeoutId = setTimeout(function () {
            // this.appState.addLoadingInterception(loadingInterception);
        }.bind(this), 25)
        return loadingInterception;
    },
    clearLoadingInterception: function (loadingInterception: any) {

        // TODO this.appState.removeLoadingInterception(loadingInterception);
    },
    setHeaderConfig: function (token: string) {
        if (token) {
            this.headerConfig = {
                headers: {Authorization: `Bearer ${token}`}
            };
        } else {
            this.headerConfig = {};
        }
    }

};
function isOnMultipleToastByStatusBlacklist(errorCode: number) {
    return errorCode && ERROR_CODES_ALLOW_MULTIPLE_BLACKLIST.includes(errorCode);
}

export function preventMultipleToastRequired(errorCode: number, toasts: any[]) {
    if (isOnMultipleToastByStatusBlacklist(errorCode)) {
        return toasts?.filter(toast => toast.errorCode !== errorCode);
    }
    return toasts;
}

export function getToast(id: number, message: string, type:string, timeOutId: number, errorCode = null) {
    return {
        message: message,
        id: id,
        timeOutId: timeOutId,
        type: type,
        errorCode: errorCode
    };
}







function getLoadingText(path:string) {
    switch (path) {
        default:
            return 'Daten werden geladen...';
    }
}

export const CREATE_DOCUMENT_ENDPOINT = '/create-room';
export const UPDATE_DOCUMENT_ENDPOINT = '/join-room';
export const UPDATE_TOKEN_ENDPOINT = '/update-token';

export const PREFIX_FIND_DELETED_USERS_ENDPOINT = '/find-deleted-users';
export const HOME_ROUTE = '/';

/* error texts */
/* eslint-disable */
export const DOKUMENT_DOES_NOT_EXISTS = `Das Dokument existiert nicht mehr.`;
export const SERVER_NOT_REACHABLE = `Der Server scheint nicht erreichbar. Versuche es bitte später nochmal.`;
export const REGISTRATION_SUCCESS = (loggedInUser: any) => `Registrierung erfolgreich Herzlich Willkommen ${loggedInUser.name}.`;
export const LOGIN_SUCCESS = (loggedInUser: any) => `Herzlich Willkommen ${loggedInUser.name}.`;
export const DOCUMENT_CREATION_SUCCESS = `Das Dokument wurde erfolgreich angelegt.`;
export const DOCUMENT_RESTORE_SUCCESS = `Das Dokument wurde erfolgreichwiederhergestellt.`;
export const DOCUMENT_RELOAD_SUCCESS = `Das Dokument wurde erfolgreich aktualisiert.`;
export const DOCUMENT_RELOAD_UNNECESSARY = `Das Dokument ist bereits auf dem neusten Stand.`;
export const DOCUMENT_SAVE_SUCCESS = `Das Dokument wurde erfolgreich gespeichert.`;
export const DOKUMENT_REMOVE_SUCCESS = `Das Dokument wurde erfolgreich gelöscht.`;
export const ICON_SAVE_SUCCESS = `Das Icon wurde erfolgreich gespeichert.`;
export const DOCUMENT_CLICK_OUTSIDE_OPEN_MENU_ON_EXISTING_CHANGES = `Du hast noch ungespeicherte Änderungen an deinem Icon!`;

