import {Express} from "express";

import {
    s9DocumentEditorsService,
    userService, websocketService
} from "../server";

import {
    APP_REST_PREFIX,
    ErrorResponse,
    ResponseCode,
    RestControllerConfigurator
} from "../controller-config/rest-controller-configurator";
import {GridFsStorage} from "multer-gridfs-storage/lib/gridfs";
import {GridFSBucket} from "mongodb";
import {
    DELETE_USER_ERROR,
    DOCUMENT_DOES_NOT_EXIST,
    ERROR_DOCUMENT_NOT_FOUND_BY_ID,
    ERROR_GETTING_DOCUMENT,
    ERROR_NO_DOCUMENT_HISTORY_NOT_FOUND,
    ERROR_NO_DOCUMENT_HISTORY_REQUEST,
    ERROR_ON_DOCUMENT_SEARCH,
    ERROR_WHILE_CREATE_DOCUMENT, ERROR_WHILE_CREATING_ROOM,
    ERROR_WHILE_DELETE_DOCUMENT,
    ERROR_WHILE_DOCUMENT_RELOAD,
    ERROR_WHILE_DOWNLOADING_IMAGE,
    ERROR_WHILE_GETTING_DOCUMENT_EDITORS,
    ERROR_WHILE_REGISTER_USER,
    ERROR_WHILE_RESTORING_DOCUMENT,
    ERROR_WHILE_SAVING_IMAGE,
    ERROR_WHILE_TAGS_REQUEST,
    ERROR_WHILE_UPDATING_DOCUMENT,
    ERROR_WHILE_UPDATING_DOCUMENT_EDITORS,
    ERROR_WHILE_USERS_REQUEST,
} from "../constants/error-texts";
import {
    addLastEditedByUserIdToDocument, getBadRequestErrorResponseHandling,
    getErrorResponseHandling,
    getInternalErrorErrorResponseHandling, wait, WAIT_DELAY_FOR_EXPENSIVE_REQUESTS
} from "../util/util";
import {S9DocumentRevisionMapper} from "../mapper/s9-mapper";
import {logger} from "../services/s9logger";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {RequestMessageType} from "../constants/global";
import {BasicRequest} from "../model/basic-request.model";
import {AuthenticatedRequest} from "../model/authenticated-request.model";


const MongoClient = require("mongodb").MongoClient;

export class WebsocketControllerImpl {
    private static INSTANCE: WebsocketControllerImpl = new WebsocketControllerImpl();

    public static get websocketControllerImpl(): WebsocketControllerImpl {
        return WebsocketControllerImpl.INSTANCE;
    }

    public constructor() {
    }

    onPlayerMessageIncoming(playerConnection: any, data: any) {
        try {
            const request = JSON.parse(data);

            if ('ping' in request) {
                return;
            }

            console.log(request)

        } catch (e) {
            console.log(e);
        }
    }

    authenticate(authenticatedRequest: AuthenticatedRequest) {
        const gameSession: any = null; //gameSessionManager.getGameSession(authenticatedRequest.gameSessionId);
        if (gameSession) {
            const playerSession = gameSession.authenticate(authenticatedRequest.playerAuthentication);
            return {gameSession, playerSession};
        }
        return null;
    }

}