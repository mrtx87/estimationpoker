import {S9DocumentModel} from "../db/mongodb/db-schemas";
import {S9Document} from "../model/estimation-poker-room";
import {S9Mapper} from "../mapper/s9-mapper";
import {s9DocumentEditorsService, s9DocumentRevisionRepository, s9TagRepository} from "../server";
import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {
    DELETE_DOCUMENT_ERROR,
    DOCUMENT_DOES_NOT_EXIST,
    DOCUMENT_TO_BE_RESTORED_NOT_EXIST,
    DOCUMENT_TO_BE_STORED_NOT_EXIST,
    ERROR_ON_DOCUMENT_SEARCH,
    LOCKING_DOCUMENT_CHANGED,
    NOT_AUTHORIZED_TO_DELETE_DOCUMENT,
    NOT_AUTHORIZED_TO_EDIT_DOCUMENT,
    NOT_AUTHORIZED_TO_RESTORE_DOCUMENT,
    SAVE_DOCUMENT_ERROR,
    SAVE_RESTORE_ERROR
} from "../constants/error-texts";
import {logger} from "../services/s9logger";
import {
    addLastEditedByUserIdToDocument,
    getBadRequestErrorResponseHandling, getConflictingErrorResponseHandling,
    getInternalErrorErrorResponseHandling, getNextPageObjectId, getNotFoundErrorResponseHandling, MAX_RESULTS_DOC_SEARCH
} from "../util/util";
import {INFO_DOCUMENT_DELETED, INFO_DOCUMENT_REVISION_DELETED} from "../constants/logging-texts";
import {DocumentSearchParams} from "../model/document-search-params";


export function restore_Document_Not_Exists_error() {
    return getBadRequestErrorResponseHandling(DOCUMENT_TO_BE_RESTORED_NOT_EXIST);
}

export class S9DocumentRepository {
    private static INSTANCE: S9DocumentRepository = new S9DocumentRepository();

    public static get documentRepository(): S9DocumentRepository {
        return S9DocumentRepository.INSTANCE;
    }


    private constructor() {
    }

    restoreS9Document(request: any) {
        try {
            const restoreData = request.body;
            const userId = request.user.id;
            const version = restoreData.version;
            const documentId = restoreData.documentId;

            return this.getDocumentById(documentId).then((currentDocumentModel) => {
                if (!currentDocumentModel) {
                    return restore_Document_Not_Exists_error();
                }

                if (!this.isAuthor(userId, currentDocumentModel)) {
                    return getBadRequestErrorResponseHandling(NOT_AUTHORIZED_TO_RESTORE_DOCUMENT);
                }

                return s9DocumentRevisionRepository.getDocumentRevisionById(documentId)
                    .then(documentRevision => {
                        if (!documentRevision) {
                            return restore_Document_Not_Exists_error();
                        }
                        const documentVersionToRestore = this.findExactDocumentByVersion(version, documentRevision);
                        if (!documentVersionToRestore) {
                            return restore_Document_Not_Exists_error();
                        }
                        return this.executeDocumentRestore(request.user.id, documentVersionToRestore, currentDocumentModel);
                    });

            });
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_RESTORE_ERROR).toPromise();
        }
    }

    createS9Document(request: any) {
        try {
            const requestDocument = S9Document.createS9Document(request.body);
            this.tagsToLowerCase(requestDocument);
            const s9DocumentModel = new S9DocumentModel(requestDocument);

            return s9DocumentModel
                .save()
                .then(() => this.afterDocumentCreationProcessing(requestDocument));
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_DOCUMENT_ERROR).toPromise();
        }
    }

    deleteS9Document(request: any): any {
        const documentId = request.body?.documentId;
        const userId = request.user.id;
        return S9DocumentModel
            .findOne({id: documentId})
            .then(documentModelToDelete =>
                this.executeDocumentDeletion(userId, documentId, documentModelToDelete)
            );
    }

    updateS9Document(request: any): any {
        const rawChangedDocument = request.body.current;
        const previousDocument = request.body.previous;
        return S9DocumentModel
            .findOne({id: rawChangedDocument.id})
            .then((storedS9DocumentModel: any) => this.executeDocumentUpdate(request.user.id, S9Document.of(previousDocument), S9Document.of(rawChangedDocument), storedS9DocumentModel));
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

    private findDocumentsBySearchText(searchParams: DocumentSearchParams) {

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
    }

    private tagsToLowerCase(document: S9Document) {
        document.tags = document.tags.map(tag => tag.toLowerCase());
    }

    private isAuthor(userId: string, storedS9Document: any) {
        return storedS9Document.author === userId;
    }

    private isEditor(userId: string, storedS9Document: any) {
        return s9DocumentEditorsService.isDocumentEditor(userId, storedS9Document.id);
    }

    private updateDocumentInDB(storedS9Document: any, previousDocument: S9Document, updatedDocument: S9Document) {
        this.tagsToLowerCase(updatedDocument);
        this.updateCurrentDocumentModelSafe(storedS9Document, updatedDocument);
        s9TagRepository.updateTags(updatedDocument.tags);
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

    private restoreDocumentInDB(currentDocumentModel: any, documentToRestore: S9Document) {
        const previousDocument = S9Mapper.map(currentDocumentModel);
        this.updateCurrentDocumentModelSafe(currentDocumentModel, documentToRestore);
        return currentDocumentModel
            .save()
            .then((storedDoc: any) => {
                logger.info('[DocumentRepository] document restored: ' + documentToRestore.id + ' -  version: ' + documentToRestore.version);
                s9DocumentRevisionRepository.updateS9DocumentRevision(previousDocument);
                return S9Mapper.map(storedDoc);
            }, () => new ErrorResponse({
                code: ResponseCode.BAD_REQUEST,
                message: SAVE_RESTORE_ERROR
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

    private afterDocumentCreationProcessing(requestDocument: S9Document) {
        try {
            logger.info('[DocumentRepository] document created: ' + requestDocument.id)
            s9TagRepository.updateTags(requestDocument.tags);
            return S9Mapper.map(requestDocument);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_DOCUMENT_ERROR);
        }
    }

    private executeDocumentDeletion(userId: string, documentId: string, documentModelToDelete: any) {
        try {
            if (!documentModelToDelete) {
                return getBadRequestErrorResponseHandling(DOCUMENT_DOES_NOT_EXIST)
            }

            if (!this.isAuthor(userId, documentModelToDelete)) {
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

    private executeDocumentRevisionDeletion(documentId: string) {
        return s9DocumentRevisionRepository.getDocumentRevisionById(documentId).then(documentRevision => {
            if (!documentRevision) {
                return this.generateDocumentDeleteInfo(documentId, true);
            }

            return documentRevision.delete()
                .then(() => this.generateDocumentDeleteInfo(documentId, true, true));
        });
    }

    private async executeDocumentUpdate(userId: any, previousDocument: S9Document, updatedDocument: S9Document, storedS9DocumentModel: any) {
        try {
            if(!storedS9DocumentModel) {
                return getNotFoundErrorResponseHandling(DOCUMENT_TO_BE_STORED_NOT_EXIST);
            }
            //check if request user is author or editor of this document
            if (this.isAuthor(userId, storedS9DocumentModel) || await this.isEditor(userId, storedS9DocumentModel)) {
                if (this.hasDiffToPrevious(storedS9DocumentModel, previousDocument))  {
                    return getConflictingErrorResponseHandling(LOCKING_DOCUMENT_CHANGED);
                }

                return this.updateDocumentInDB(storedS9DocumentModel, previousDocument, updatedDocument);
            }

            return getBadRequestErrorResponseHandling(NOT_AUTHORIZED_TO_EDIT_DOCUMENT);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_DOCUMENT_ERROR);
        }
    }

    private executeDocumentRestore(userId: any, documentModelToRestore: any, currentDocumentModel: any) {
        try {
            const s9DocumentToRestore = S9Mapper.map(documentModelToRestore);
            addLastEditedByUserIdToDocument(s9DocumentToRestore, userId);
            return this.restoreDocumentInDB(currentDocumentModel, s9DocumentToRestore);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, SAVE_DOCUMENT_ERROR);
        }
    }

    private findExactDocumentByVersion(version: string, documentRevision: any) {
        return documentRevision.documents.find((document: any) => {
            return document.version === version;
        });
    }

    private generateDocumentDeleteInfo(documentId: string, success: boolean, withRevision = false) {
        if (withRevision) {
            logger.log(INFO_DOCUMENT_REVISION_DELETED(documentId));
        }
        return {deleted: success, documentId: documentId, deletedRevision: withRevision}
    }

    private getSearchResultPage(foundDocuments: any[]) {
        if (!foundDocuments || foundDocuments.length === 0) {
            return new SearchResultPage({results: [], nextPageObjectId: null})
        }

        return new SearchResultPage({
            results: foundDocuments.map(S9Mapper.map),
            nextPageObjectId: getNextPageObjectId(foundDocuments)
        });
    }

    private hasDiffToPrevious(storedS9DocumentModel: S9Document, previousDocument: S9Document){
        return storedS9DocumentModel.changedAt !== previousDocument.changedAt || storedS9DocumentModel.body !== previousDocument.body || storedS9DocumentModel.title !== previousDocument.title;
    }

}


export class SearchResultPage {
    results: S9Document[];
    nextPageObjectId: string;

    constructor(init: Partial<SearchResultPage>) {
        this.results = init.results;
        this.nextPageObjectId = init.nextPageObjectId;
    }
}