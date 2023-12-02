import {Express} from "express";

import {estimationRoomService, estimationService, userService} from "../server";

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

export function applyAppRestControllerConfig(app: Express) {

    new RestControllerConfigurator(app)
        .addPrefix(APP_REST_PREFIX)
        .addPostEndPoint('/create-room', handleCreateRoomRequest)
        .addPostEndPoint('/join-room', handleNewJoinRoomRequest)
        .addGetEndPoint('/estimation-history', handleEstimationHistoryRequest)
}

function handleCreateRoomRequest(req: any, res: any) {
    return estimationRoomService.createRoom(req.body).catch((error: any) => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_CREATING_ROOM));
}

function handleNewJoinRoomRequest(req: any, res: any) {
    const joinRoomRequest: any = req.body;
    return estimationRoomService.joinRoomAsNewUser(joinRoomRequest)
        .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_JOINING_ROOM));
}

function handleEstimationHistoryRequest(req: any, res: any) {
    return estimationService.getClosedEstimations(req.user.roomId)
        .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_JOINING_ROOM));
}


