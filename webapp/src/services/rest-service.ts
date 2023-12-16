import axios from "axios";
import {languageService} from "@/services/language";

export function isLocalHost() {
    return window.location.href.includes('localhost:8080');
}


export const REST_BASE_PATH = isLocalHost() ? 'http://localhost:8085/em/api/rest' : 'https://v2202005121049117361.nicesrv.de/em/api/rest';// 2MB in bytes

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

export class RestService {
    appState: any;
    headerConfig = {};

    sendPostRequest(path: string, data: any, blocking = true, authorized = true) {
        return axios.post(REST_BASE_PATH + path, data, authorized ? this.headerConfig : {})
            .then(response => response, this.errorHandling.bind(this));
    }

    sendGetRequest(path: string, blocking = true, authorized = true) {
        return axios.get(REST_BASE_PATH + path, authorized ? this.headerConfig : {})
            .then(response => response, this.errorHandling.bind(this));
    }

    setAppState(appState: any) {
        this.appState = appState;
    }

    errorHandling(error: any) {
        this.handleToastOnError(error);
        return Promise.reject(error);
    }

    handleToastOnError(error: any) {
        if (!error || !error.response) {
            this.appState?.toast.error(SERVER_NOT_REACHABLE);
            return;
        }
        if (error.response.data) {
            this.appState?.toast.error(this.tl8(error.response.data));
            return;
        }
    }

    setHeaderConfig(token: string) {
        if (token) {
            this.headerConfig = {
                headers: {Authorization: `Bearer ${token}`}
            };
        } else {
            this.headerConfig = {};
        }
    }

    tl8(key: string, vars: any = null) {
        return languageService.t(key, this.appState.langKey, vars);
    }

}

export const restService = new RestService();

function isOnMultipleToastByStatusBlacklist(errorCode: number) {
    return errorCode && ERROR_CODES_ALLOW_MULTIPLE_BLACKLIST.includes(errorCode);
}

function getLoadingText(path: string) {
    switch (path) {
        default:
            return 'Daten werden geladen...';
    }
}

/* error texts */
export const SERVER_NOT_REACHABLE = `The server does not seem to be available. Please try again later.`;
export const TRYING_RECONNECT = `Trying to reconnect...`;


