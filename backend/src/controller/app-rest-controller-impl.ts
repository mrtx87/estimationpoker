import {Express} from "express";

import {estimationRoomCache, estimationRoomService, estimationService, userService} from "../server";

import {
    APP_REST_PREFIX,
    ResponseCode,
    RestControllerConfigurator
} from "../controller-config/rest-controller-configurator";
import {ERROR_REQUESTING_ROOM_PREVIEWS, ERROR_WHILE_JOINING_ROOM,} from "../constants/error-texts";
import {getErrorResponseHandling} from "../util/util";
import {BasicResponse} from "../model/basic-response.model";
import {ResponseMessageType} from "../constants/global";

export function applyAppRestControllerConfig(app: Express) {

    new RestControllerConfigurator(app)
        .addPrefix(APP_REST_PREFIX)
        .addPostEndPoint('/create-room', handleCreateRoomRequest)
        .addPostEndPoint('/join-room', handleNewJoinRoomRequest)
        .addPostEndPoint('/estimation-history', handleEstimationHistoryRequest)
        .addPostEndPoint('/room-history', handleRoomHistoryRequest)
        .addGetEndPoint('/delete-user', handleDeleteUser)
}

function handleCreateRoomRequest(req: any, res: any) {
    try {
        return estimationRoomService.createRoom(req.body).catch((error: any) => error);
    } catch (e) {
        return getErrorResponseHandling(e, ResponseCode.INTERNAL_ERROR).toPromise();
    }
}

function handleNewJoinRoomRequest(req: any, res: any) {
    try {
        const joinRoomRequest: any = req.body;
        return estimationRoomService.joinRoomAsNewUser(joinRoomRequest)
            .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR));
    } catch (e) {
        return getErrorResponseHandling(e, ResponseCode.INTERNAL_ERROR).toPromise();
    }
}

function handleEstimationHistoryRequest(req: any, res: any) {
    try {
        const date = req.body.date;
        return estimationService.getClosedEstimations(req.user.roomId, date)
            .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_JOINING_ROOM));
    } catch (e) {
        return getErrorResponseHandling(e, ResponseCode.INTERNAL_ERROR).toPromise();
    }
}

function handleRoomHistoryRequest(req: any, res: any) {
    try {
        const receivedRoomTokens = req.body;
        const givenRoomUserAuthentications = receivedRoomTokens.map(userService.authenticateToken).filter((ra: any) => ra);
        return estimationRoomService.getRoomPreviewsInfo(givenRoomUserAuthentications)
            .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_REQUESTING_ROOM_PREVIEWS));
    } catch (e) {
        return getErrorResponseHandling(e, ResponseCode.INTERNAL_ERROR).toPromise();
    }
}

function handleDeleteUser(req: any, res: any) {
    try {
        return userService.deleteUser(req.user.id)
            .then(success => {
                if (success) {
                    const cachedRoom = estimationRoomCache.getCachedRoom(req.user.roomId);
                    if (cachedRoom) {
                        cachedRoom.removeUser(req.user.id)
                    }
                }
                return new BasicResponse(ResponseMessageType.USER_DELETED);
            });
    } catch (e) {
        return getErrorResponseHandling(e, ResponseCode.INTERNAL_ERROR).toPromise();
    }
}

