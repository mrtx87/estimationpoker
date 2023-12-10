import {logger} from "../services/s9logger";
import {InitAppProcess} from "../model/init-app-process";
import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {v4 as UUID} from 'uuid';
import {RoomSettings} from "../model/room-settings";
import {Vote} from "../model/vote";

export const MAX_RESULTS_DOC_SEARCH = 25;

export function abortStartupOnCriticalError(init: InitAppProcess) {
    printAppInitResult(init);
    process.exit(0);
    return;
}

export function printAppInitResult(init: InitAppProcess) {
    logger.info('#### App Initialization Overview ####');
    const result = {
        mandatory: 0,
    };
    for (const [prop, success] of Object.entries(init.steps)) {

        const mandatory = init.mandatory.includes(prop);
        if (success === 1) {
            logger.info(`### ${prop} : ok ###`);
            if (mandatory) {
                result.mandatory += 1;
            }
        } else if (success === -1) {
            logger.error(`### ${prop} : 'failed' ###`);
        } else {
            logger.warn(`### ${prop} : 'not started' ###`);
        }
    }
    const objEntries = Object.entries(init.steps);
    if (objEntries.every(([prop, success]) => success === 1)) {
        logger.info('[AppStartUp]: Initialized successfully!');
        return Promise.resolve(init);
    }

    if (init.mandatory.length === result.mandatory) {
        logger.warn('App initialized successfully with Warnings');
        return Promise.resolve(init);
    }

    logger.error('!!! APP START HAS FAILED !!! - see logs for details')
    return Promise.reject(init);
}

export function addLastEditedByUserIdToDocument(currentDocument: any, userId: string) {
    currentDocument.lastEditedBy = userId;
}

export function getErrorResponseHandling(error: any, code: ResponseCode, customMessage: string = null) {
    if (customMessage) {
        logger.internalError(customMessage);
    }
    logger.internalError(error);
    return new ErrorResponse({
        code: code,
        message: customMessage ? customMessage : (typeof error === 'string' ? error : error.message)
    });
}

export function getInternalErrorErrorResponseHandling(error: any, customMessage: string = null) {
    return getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, customMessage);
}

export function getBadRequestErrorResponseHandling(error: any, customMessage: string = null) {
    return getErrorResponseHandling(error, ResponseCode.BAD_REQUEST, customMessage);
}

export function getForbiddenErrorResponseHandling(error: any, customMessage: string = null) {
    return getErrorResponseHandling(error, ResponseCode.FORBIDDEN, customMessage);
}

export function getUnauthorizedErrorResponseHandling(error: any, customMessage: string = null) {
    return getErrorResponseHandling(error, ResponseCode.UNAUTHORIZED, customMessage);
}

export function getConflictingErrorResponseHandling(error: any, customMessage: string = null) {
    return getErrorResponseHandling(error, ResponseCode.CONFLICTING, customMessage);
}

export function getNotFoundErrorResponseHandling(error: any, customMessage: string = null) {
    return getErrorResponseHandling(error, ResponseCode.NOT_FOUND, customMessage);
}

export function wait(ms: number, value: any) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}


export function getNextPageObjectId(foundDocuments: any[]) {
    if (foundDocuments.length >= MAX_RESULTS_DOC_SEARCH) {
        const nextPageObjectId = foundDocuments[foundDocuments.length - 1]._id;
        return nextPageObjectId.toString();
    }
    return null;
}

export const WAIT_DELAY_FOR_EXPENSIVE_REQUESTS = 400;


export function isPresent(e: string) {
    return Boolean(e);
}

export function hasRequiredAppConfig(init: InitAppProcess) {
    const requiredConfigAttributes = [
        process.env.WEBAPP_ORIGIN,
        process.env.DB_CONFIG_URL,
        process.env.DB_CONFIG_DB_NAME,
        process.env.DB_CONFIG_IMG_BUCKET,
        process.env.SYSTEM_URL,
        process.env.PORT,
        process.env.JWT_KEY,
        process.env.JWT_TOKEN_EXPIRY];

    if (requiredConfigAttributes.every(isPresent)) {
        init.steps.requiredConfig = 1;
        return Promise.resolve(init);
    }
    init.steps.requiredConfig = -1;
    return Promise.reject(init);
}

// test documents stuff
export function getTestRoom() {
    return EstimationPokerRoom.createEstimationPokerRoom(new RoomSettings({
        title: "Testraum" + UUID(),
        realtimeVoting: false,
        valueOptionsId: 1
    }), UUID());
}

export function maskVoteValues(votes: Vote[]) {
    return votes.map(v => {
        return {...v, value: null}
    });
}