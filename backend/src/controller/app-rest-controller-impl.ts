import {Express} from "express";

import {estimationRoomService, estimationService, userService} from "../server";

import {
    APP_REST_PREFIX,
    ResponseCode,
    RestControllerConfigurator
} from "../controller-config/rest-controller-configurator";
import {
    ERROR_REQUESTING_ROOM_PREVIEWS,
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
        .addPostEndPoint('/room-history', handleRoomHistoryRequest)
}

function handleCreateRoomRequest(req: any, res: any) {
    return estimationRoomService.createRoom(req.body).catch((error: any) => error);
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

function handleRoomHistoryRequest(req: any, res: any) {
    const receivedRoomTokens = req.body;
    const givenRoomUserAuthentications = receivedRoomTokens.map(userService.authenticateToken).filter((ra: any) => ra);
    return estimationRoomService.getRoomPreviewsInfo(givenRoomUserAuthentications).catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_REQUESTING_ROOM_PREVIEWS));;
}

