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
    ERROR_WHILE_REGISTER_USER,
    INVALID_TOKEN,
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

function handleRejoinRoomRequest(req: any, res: any) {
    logger.log("rejoin room")
    return estimationRoomService.joinRoomAsKnownUser({userId: req.user.id, roomId: req.user.roomId})
        .catch(error => getErrorResponseHandling(error, ResponseCode.INTERNAL_ERROR, ERROR_WHILE_JOINING_ROOM));
}

/*
function handleRegisterRequest(req: any, res: any) {
    return userService.onHandleRegister(req, res)
        .catch(e => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_REGISTER_USER));
}

function handleSearchDocumentsRequest(request: any) {
    const searchParams = request.body;
    return s9DocumentRepository.findDocuments(searchParams)
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_ON_DOCUMENT_SEARCH));
}

async function handleGetDocumentRequest(request: any) {
    try {
        const documentId = request.body?.documentId;
        const foundDocument = await s9DocumentRepository.getDocumentById(documentId);
        if (foundDocument) {
            return S9Document.of(foundDocument);
        }
        return getBadRequestErrorResponseHandling(ERROR_DOCUMENT_NOT_FOUND_BY_ID(documentId));
    } catch (e) {
        return getInternalErrorErrorResponseHandling(e, ERROR_GETTING_DOCUMENT);
    }
}

function handleCreateDocumentRequest(request: any) {
    addLastEditedByUserIdToDocument(request.body, request.user.id);
    return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, request).then(s9DocumentRepository.createS9Document.bind(s9DocumentRepository))
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_CREATE_DOCUMENT));
}

function handleRestoreDocumentRequest(request: any) {
    return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, request).then(s9DocumentRepository.restoreS9Document.bind(s9DocumentRepository))
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_RESTORING_DOCUMENT));
}

function handleUpdateDocumentRequest(request: any) {
    addLastEditedByUserIdToDocument(request.body.current, request.user.id);
    return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, request).then(s9DocumentRepository.updateS9Document.bind(s9DocumentRepository))
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_UPDATING_DOCUMENT));

}

function handleDeleteDocumentRequest(request: any) {
    return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, request).then(s9DocumentRepository.deleteS9Document.bind(s9DocumentRepository))
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_DELETE_DOCUMENT));
}

function handleGetDocumentEditors(request: any) {
    return s9DocumentEditorsService.getDocumentEditors(request)
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_GETTING_DOCUMENT_EDITORS));
}

function handleUpdateDocumentEditors(request: any) {
    return s9DocumentEditorsService.updateDocumentEditors(request)
        .catch((e: any) => getInternalErrorErrorResponseHandling(e, ERROR_WHILE_UPDATING_DOCUMENT_EDITORS));
}

function handleGetWaitingDocumentUpdates(request: any) {
    const documentsChanged = request.body;
    return s9DocumentRepository
        .getDocumentsChanged(documentsChanged);
}

function handleStoreImageRequest(request: any, response: any) {
    try {
        if (request.rejectedRequest) {
            return Promise.resolve(request.rejectedRequest);
        }
        return Promise.resolve({location: process.env.SYSTEM_URL + APP_REST_PREFIX + "/images/" + request.imageDBName});
    } catch (e) {
        return getInternalErrorErrorResponseHandling(e, ERROR_WHILE_SAVING_IMAGE).toPromise();
    }
}

function handleGetImageRequest(req: any, res: any) {
    try {
        const mongoClient = new MongoClient(process.env.DB_CONFIG_URL + process.env.DB_CONFIG_DB_NAME);
        const database = mongoClient.db(process.env.DB_CONFIG_DB_NAME);
        const bucket = new GridFSBucket(database, {
            bucketName: process.env.DB_CONFIG_IMG_BUCKET,
        });
        let downloadStream = bucket.openDownloadStreamByName(req.params.fileName);
        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });
        downloadStream.on("error", function (err) {
            return res.status(404).send({message: ERROR_WHILE_DOWNLOADING_IMAGE});
        });
        downloadStream.on("end", () => {
            return res.end();
        });
        return Promise.resolve(null);
    } catch (e) {
        return getInternalErrorErrorResponseHandling(e, ERROR_WHILE_DOWNLOADING_IMAGE).toPromise();
    }
}

function handleTagsRequest(request: any, response: any) {
    return s9TagRepository.findTags()
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_TAGS_REQUEST));
}

function handleGetUserRequest(request: any, response: any) {
    const userIds = request.params.userId;
    return s9UserService.getPublicUser(userIds)
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_USERS_REQUEST));
}

function handleResolveUsersByIdRequest(request: any, response: any) {
    const userIds = request.body;
    return s9UserService.findAllUsersAndDeletedUsersById(userIds)
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_USERS_REQUEST));
}

function handleFindAllUsersRequest(request: any, response: any) {
    return s9UserService.findPublicUsers('')
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_USERS_REQUEST));
}

function handleFindAllDeletedUsersRequest(request: any, response: any) {
    return s9UserService.getDeletedUsers()
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_USERS_REQUEST));
}

function handleFindUsersRequest(request: any, response: any) {
    const searchText = request.params.searchText;
    return s9UserService.findPublicUsers(searchText)
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_USERS_REQUEST));
}

function handleReloadDocumentRequest(request: any, response: any) {
    return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, request).then(s9DocumentRepository.getDocumentById.bind(s9DocumentRepository, request.body.documentId))
        .then(doc => doc ? S9Mapper.map(doc) : getBadRequestErrorResponseHandling(DOCUMENT_DOES_NOT_EXIST))
        .catch(error => getInternalErrorErrorResponseHandling(error, ERROR_WHILE_DOCUMENT_RELOAD));
}


function handleDocumentRevisionRequest(request: any, response: any) {
    return s9DocumentRevisionRepository.getDocumentRevisionById(request.body.documentId)
        .then(docRevision => docRevision ? S9DocumentRevisionMapper.map(docRevision) : new ErrorResponse({
            code: ResponseCode.BAD_REQUEST,
            message: ERROR_NO_DOCUMENT_HISTORY_NOT_FOUND
        })).catch(e => getInternalErrorErrorResponseHandling(e, ERROR_NO_DOCUMENT_HISTORY_REQUEST));
}

function updateTokenRequest(request: any, response: any) {
    return s9UserService.refreshToken(request, response);
}
*/

