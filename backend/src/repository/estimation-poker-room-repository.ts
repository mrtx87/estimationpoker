import {EstimationPokerRoomModel} from "../db/mongodb/db-schemas";
import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {getBadRequestErrorResponseHandling, getInternalErrorErrorResponseHandling} from "../util/util";
import {CREATE_ROOM_ERROR, NOT_AUTHORIZED_TO_EDIT_DOCUMENT} from "../constants/error-texts";
import {logger} from "../services/s9logger";
import {EstimationPokerRoomMapper} from "../mapper/s9-mapper";

export class EstimationPokerRoomRepository {
    private static INSTANCE: EstimationPokerRoomRepository = new EstimationPokerRoomRepository();

    public static get estimationPokerRoomRepository(): EstimationPokerRoomRepository {
        return EstimationPokerRoomRepository.INSTANCE;
    }


    private constructor() {
    }

    createEstimationPokerRoom(request: any) {
        try {
            const estimationPokerRoom = EstimationPokerRoom.createEstimationPokerRoom(request.body);
            const estimationPokerRoomModel = new EstimationPokerRoomModel(estimationPokerRoom);

            return estimationPokerRoomModel
                .save()
                .then(() => this.postRoomCreationProcessing(estimationPokerRoomModel));
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, CREATE_ROOM_ERROR).toPromise();
        }
    }

    deleteS9Document(request: any): any {
        const roomId = request.body?.roomId;
        const userId = request.user.id;
        return EstimationPokerRoomModel
            .findOne({id: roomId})
            .then(documentModelToDelete =>
                this.executeRoomDeletion(userId, roomId, documentModelToDelete)
            );
    }

    updateRoom(request: any): any {
        // TODO wie werden room updates gemacht
        const roomUpdate = request.body.room;
        return EstimationPokerRoomModel
            .findOne({id: roomUpdate.id})
            .then((storedRoom: any) => this.executeDocumentUpdate(request.user.id, EstimationPokerRoom.of(roomUpdate), storedRoom));
    }

    findDocuments(searchParams: any): Promise<SearchResultPage | ErrorResponse> {
        try {

            /*
            if (params.nextPageObjectId) {
                return this.findNextPageByDocumentObjectId(params.nextPageObjectId);
            }*/

            searchParams = new DocumentSearchParams(searchParams);
            if (searchParams.exactMatch) {
                return this.findDocumentsByExactWordMatch(searchParams);
            }

            if (searchParams.tags && searchParams.tags.length > 0) {
                return this.findDocumentsByTagsAndSearchText(searchParams)
                    .then(this.getSearchResultPage);
            }

            if (searchParams.searchText) {
                return this.findDocumentsBySearchText(searchParams)
                    .limit(MAX_RESULTS_DOC_SEARCH)
                    .then(this.getSearchResultPage);
            }
            return this.findAllDocumentsPaged(searchParams)
                .limit(MAX_RESULTS_DOC_SEARCH)
                .then(this.getSearchResultPage);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, ERROR_ON_DOCUMENT_SEARCH).toPromise();
        }
    }

    private findDocumentsByExactWordMatch(params: DocumentSearchParams): Promise<SearchResultPage | ErrorResponse> {
        try {
            const tags = params.tags;
            const searchText = params.searchText;
            if (tags && tags.length > 0) {
                return this.findDocumentsByTagsAndExactSearchText(searchText, tags)
                    .then(this.getSearchResultPage);
            }

            return this.findDocumentsByExactSearchText(searchText)
                .then(this.getSearchResultPage);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, ERROR_ON_DOCUMENT_SEARCH).toPromise();
        }
    }


    findDocumentsByAuthor(authorId: string): PromiseLike<any> {
        return S9DocumentModel.find({author: authorId});
    }

    findAllDocuments() {
        return S9DocumentModel.find();
    }

    findAllDocumentsPaged(searchParams: DocumentSearchParams) {
        if (searchParams.nextPageObjectId) {
            return S9DocumentModel.find({
                _id: {'$gt': searchParams.nextPageObjectId}
            });
        }

        return S9DocumentModel.find();
    }

    getDocumentById(documentId: string) {
        return S9DocumentModel
            .findOne({id: documentId});
    }

    getDocumentsByIds(documentIds: string[]) {
        return S9DocumentModel
            .find()
            .where('id').in(documentIds)
    }

    async getDocumentsChanged(documentsChanged: any[]) {
        const foundDocuments = await this.getDocumentsByIds(documentsChanged.map(dc => dc.documentId));
        return documentsChanged
            .filter(dc => foundDocuments.some(d => dc.documentId === d.id && d.changedAt !== dc.changedAt))
            .map(dc => dc.documentId);
    }

    /*private findDocumentsBySearchText(searchParams: DocumentSearchParams) {

        const appliedSearchQuery: any = {
            $or: [
                {body: {$regex: '.*' + searchParams.searchText + '.*'}},
                {title: {$regex: '.*' + searchParams.searchText + '.*'}}
            ]
        };
        if (searchParams.nextPageObjectId) {
            appliedSearchQuery._id = {'$gt': searchParams.nextPageObjectId};
        }

        return S9DocumentModel.find(appliedSearchQuery);
    }

    private findDocumentsByExactSearchText(searchText: string) {
        return S9DocumentModel.find(
            {$text: {$search: searchText}},
            {score: {$meta: "textScore"}}
        );
    }

    private findDocumentsByTagsAndSearchText(searchParams: DocumentSearchParams) {
        return this.findDocumentsBySearchText(searchParams)
            .where('tags').in(searchParams.tags)
            .limit(MAX_RESULTS_DOC_SEARCH);
    }

    private findDocumentsByTagsAndExactSearchText(searchText: string, tags: string[]) {
        return this.findDocumentsByExactSearchText(searchText)
            .where('tags').in(tags)
            .limit(MAX_RESULTS_DOC_SEARCH);
    }*/

    private isModerator(userId: string, storedS9Document: any) {
        return storedS9Document.author === userId;
    }

    private isPlayer(userId: string, storedS9Document: any) {
        return s9DocumentEditorsService.isDocumentEditor(userId, storedS9Document.id);
    }

    private updateDocumentInDB(storedS9Document: any, previousDocument: S9Document, updatedDocument: S9Document) {
        this.updateCurrentDocumentModelSafe(storedS9Document, updatedDocument);
        .updateTags(updatedDocument.tags);
        return storedS9Document
            .save()
            .then((storedDoc: any) => {
                logger.info('[DocumentRepository] document updated: ' + storedS9Document.id + ' -  version: ' + storedS9Document.version);
                s9DocumentRevisionRepository.updateS9DocumentRevision(previousDocument);
                return S9Mapper.map(storedDoc);
            }, () => new ErrorResponse({
                code: ResponseCode.BAD_REQUEST,
                message: SAVE_DOCUMENT_ERROR
            }));
    }

    private updateCurrentDocumentModelSafe(currentDocumentModel: any, documentUpdate: S9Document) {
        currentDocumentModel.changedAt = Date.now();
        currentDocumentModel.tags = documentUpdate.tags;
        currentDocumentModel.body = documentUpdate.body;
        currentDocumentModel.title = documentUpdate.title;
        currentDocumentModel.lastEditedBy = documentUpdate.lastEditedBy;
        currentDocumentModel.version += 1;
    }

    private postRoomCreationProcessing(requestDocument: EstimationPokerRoom) {
        try {
            logger.info('[DocumentRepository] document created: ' + requestDocument.id)
            return EstimationPokerRoomMapper.map(requestDocument);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_DOCUMENT_ERROR);
        }
    }

    private executeRoomDeletion(userId: string, documentId: string, documentModelToDelete: any) {
        try {
            if (!documentModelToDelete) {
                return getBadRequestErrorResponseHandling(DOCUMENT_DOES_NOT_EXIST)
            }

            if (!this.isModerator(userId, documentModelToDelete)) {
                return getBadRequestErrorResponseHandling(NOT_AUTHORIZED_TO_DELETE_DOCUMENT)
            }

            return documentModelToDelete
                .delete()
                .then(() => {
                        logger.log(INFO_DOCUMENT_DELETED(documentId));
                        s9DocumentEditorsService.deleteDocumentEditors(documentId);
                        return this.executeDocumentRevisionDeletion(documentId);
                    }
                );
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, DELETE_DOCUMENT_ERROR);
        }
    }

    private async executeDocumentUpdate(userId: any, previousDocument: S9Document, updatedDocument: S9Document, storedS9DocumentModel: any) {
        try {
            if(!storedS9DocumentModel) {
                return getNotFoundErrorResponseHandling(DOCUMENT_TO_BE_STORED_NOT_EXIST);
            }
            //check if request user is author or editor of this document
            if (this.isModerator(userId, storedS9DocumentModel) || await this.isEditor(userId, storedS9DocumentModel)) {
                return this.updateDocumentInDB(storedS9DocumentModel, previousDocument, updatedDocument);
            }

            return getBadRequestErrorResponseHandling(NOT_AUTHORIZED_TO_EDIT_DOCUMENT);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_DOCUMENT_ERROR);
        }
    }

}