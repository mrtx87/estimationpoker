import {Express} from "express";

import {estimationRoomService, userService} from "../server";

import {
    APP_REST_PREFIX,
    ResponseCode,
    RestControllerConfigurator
} from "../controller-config/rest-controller-configurator";
import {
    ERROR_WHILE_CREATING_ROOM,
    ERROR_WHILE_JOINING_ROOM,
} from "../constants/error-texts";
import {getErrorResponseHandling, getInternalErrorErrorResponseHandling} from "../util/util";
import {logger} from "../services/s9logger";


const MongoClient = require("mongodb").MongoClient;


export function applyAppRestControllerConfig(app: Express) {

    new RestControllerConfigurator(app)
        .addPrefix(APP_REST_PREFIX)
        .addPostEndPoint('/create-room', handleCreateRoomRequest)
        //.addGetEndPoint('/rejoin-room', handleRejoinRoomRequest)
        .addPostEndPoint('/join-room', handleNewJoinRoomRequest)

    //.addPostEndPoint('/register', handleRegisterRequest)
    //.addPostEndPoint('/search-document', handleSearchDocumentsRequest)
    //.addPostEndPoint('/get-document', handleGetDocumentRequest)
    //.addPostEndPoint('/create-document', handleCreateDocumentRequest)


}

function handleCreateRoomRequest(req: any, res: any) {
    logger.log("created room")
    return estimationRoomService.createRoom(req.body).catch((error: any) => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_CREATING_ROOM));
}

function handleNewJoinRoomRequest(req: any, res: any) {
    logger.log("join room")
    const joinRoomRequest: any = req.body;
    return estimationRoomService.joinRoomAsNewUser(joinRoomRequest)
        .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_JOINING_ROOM));
}


