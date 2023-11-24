import {S9DocumentEditorRepository} from "../repository/s9-document-editor-repository";
import {S9DocumentEditorMapper} from "../mapper/s9-mapper";
import {getBadRequestErrorResponseHandling} from "../util/util";
import {
    DOCUMENT_DOES_NOT_EXIST,
    ERROR_FORMAT_DOCUMENT_EDITORS,
    ERROR_FORMAT_UPDATING_DOCUMENT_EDITORS,
    ERROR_NOT_FOUND_DOCUMENT_EDITORS, NOT_AUTHORIZED_TO_EDIT_DOCUMENT_EDITORS
} from "../constants/error-texts";
import {INFO_DOCUMENT_EDITORS_DELETED} from "../constants/logging-texts";
import {logger} from "./s9logger";
import {s9DocumentRepository} from "../server";

const s9DocumentEditorRepository = S9DocumentEditorRepository.s9DocumentEditorRepository;

export class S9DocumentEditorService {

    private static INSTANCE: S9DocumentEditorService = new S9DocumentEditorService();

    public static get s9DocumentEditorService(): S9DocumentEditorService {
        return S9DocumentEditorService.INSTANCE;
    }

    private constructor() {
    }

    async updateDocumentEditors(req: any, res?: any) {
        const s9DocumentEditors = req.body;
        const requestingUserId = req.user?.id;
        if (!s9DocumentEditors.documentId || !s9DocumentEditors.editors || !requestingUserId) {
            return getBadRequestErrorResponseHandling(ERROR_FORMAT_UPDATING_DOCUMENT_EDITORS);
        }

        const foundDocument = await s9DocumentRepository.getDocumentById(s9DocumentEditors.documentId);
        if (!foundDocument) {
            return getBadRequestErrorResponseHandling(DOCUMENT_DOES_NOT_EXIST);
        }

        if (foundDocument.author !== requestingUserId) {
            return getBadRequestErrorResponseHandling(NOT_AUTHORIZED_TO_EDIT_DOCUMENT_EDITORS);
        }

        return s9DocumentEditorRepository.updateDocumentEditors(s9DocumentEditors)
            .then(result => {
                return {
                    ...result,
                    assignedDocumentEditors: S9DocumentEditorMapper.map(result.assignedDocumentEditors)
                }
            });
    }

    getDocumentEditors(req: any, res?: any) {
        const documentIdObj = req.body;
        if (!documentIdObj || !documentIdObj.documentId) {
            return getBadRequestErrorResponseHandling(ERROR_FORMAT_DOCUMENT_EDITORS).toPromise();
        }
        return s9DocumentEditorRepository.getEditorsByDocumentId(documentIdObj)
            .then(storedDocumentEditorsModel => storedDocumentEditorsModel
                ? S9DocumentEditorMapper.map(storedDocumentEditorsModel)
                : S9DocumentEditorMapper.map({...documentIdObj, editors: []})
            );
    }

    deleteDocumentEditors(documentId: string) {
        try {
            return s9DocumentEditorRepository.getEditorsByDocumentId({documentId: documentId})
                .then(documentEditors => {
                    if (!documentEditors) {
                        return Promise.resolve(null);
                    }

                    return documentEditors.delete().then(() => logger.log(INFO_DOCUMENT_EDITORS_DELETED(documentId)));
                })
        } catch (e) {
            logger.internalError(e);
        }
    }

    async removeDocumentEditorAssignmentByUserId(userId: string) {
        try {
            const documentEditorsList = await s9DocumentEditorRepository.getDocumentEditorsByUserId(userId);
            if (!documentEditorsList) {
                return;
            }

            documentEditorsList.forEach((documentEditorsObj) => {
                documentEditorsObj.editors = documentEditorsObj.editors.filter((editorId: string) => editorId !== userId);
                documentEditorsObj.save();
            });
        } catch (e) {
            logger.internalError(e);
        }
    }

    async isDocumentEditor(userId: string, documentId: string) {
        const documentEditors = await s9DocumentEditorRepository.getEditorsByDocumentId({documentId: documentId});
        return documentEditors.editors.includes(userId);
    }

}
