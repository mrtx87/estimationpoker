import {EstimationPokerRoomModel} from "../db/mongodb/db-schemas";
import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {
    getBadRequestErrorResponseHandling,
    getInternalErrorErrorResponseHandling,
    getNotFoundErrorResponseHandling
} from "../util/util";
import {
    ROOM_TO_BE_STORED_NOT_EXIST,
    DELETE_ROOM_ERROR,
    ROOM_DOES_NOT_EXIST
} from "../constants/error-texts";
import {logger} from "../services/s9logger";
import {EstimationPokerRoomMapper} from "../mapper/estimation-poker-mapper";
import {INFO_ROOM_DELETED} from "../constants/logging-texts";
import {RoomSettings} from "../model/room-settings";
import {stringify} from "uuid/index";


export class EstimationPokerRoomRepository {
    private static INSTANCE: EstimationPokerRoomRepository = new EstimationPokerRoomRepository();

    readonly ROOM_CONNECTIONS = new Map<string, any>();

    public static get estimationPokerRoomRepository(): EstimationPokerRoomRepository {
        return EstimationPokerRoomRepository.INSTANCE;
    }

    private constructor() {
    }

    createEstimationPokerRoom(estimationPokerRoom: EstimationPokerRoom) {
        const estimationPokerRoomModel = new EstimationPokerRoomModel(estimationPokerRoom);
        return estimationPokerRoomModel
            .save()
            .then(this.postRoomCreationProcessing);
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
            .then((storedRoom: any) =>
                this.executeRoomUpdate(EstimationPokerRoom.of(roomUpdate), storedRoom)
            );
    }

    findAllRooms() {
        return EstimationPokerRoomModel.find();
    }

    getRoomById(roomId: string) {
        return EstimationPokerRoomModel
            .findOne({id: roomId});
    }

    deleteRoom(roomId: string) {
        return this.getRoomById(roomId)
            .then(foundRoomInDB => {
                    if (foundRoomInDB) {
                        foundRoomInDB.delete();
                        return true;
                    }
                    return false;
                });
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

    private updateDocumentInDB(room: any, updatedRoom: any) {
        this.updateCurrentRoomModelSafe(room, updatedRoom);
        return room
            .save()
            .then((storedRoom: any) => {
                logger.info('Room updated: ' + storedRoom.id);
                return EstimationPokerRoomMapper.map(storedRoom);
            }, () => new ErrorResponse({
                code: ResponseCode.BAD_REQUEST,
                message: 'Fehler beim updaten des Raums'
            }));
    }

    private updateCurrentRoomModelSafe(savedRoomModel: any, roomUpdate: EstimationPokerRoom) {
        savedRoomModel.roomSettings = roomUpdate.roomSettings;
    }

    private postRoomCreationProcessing(room: EstimationPokerRoom) {
        logger.info('Room created: ' + room.id)
        return EstimationPokerRoomMapper.map(room);
    }

    private executeRoomDeletion(userId: string, documentId: string, documentModelToDelete: any) {
        try {
            if (!documentModelToDelete) {
                return getBadRequestErrorResponseHandling(ROOM_DOES_NOT_EXIST)
            }

            return documentModelToDelete
                .delete()
                .then(() => {
                        logger.log(INFO_ROOM_DELETED(documentId));
                        // TODO return ?
                    }
                );
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, DELETE_ROOM_ERROR);
        }
    }

    private async executeRoomUpdate(room: EstimationPokerRoom, storedRoom: any) {
        try {
            if (!storedRoom) {
                return getNotFoundErrorResponseHandling(ROOM_TO_BE_STORED_NOT_EXIST);
            }
            //check if request user is author or editor of this document
            return this.updateDocumentInDB(storedRoom, room);
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e, 'Fehler beim ändern des Raumes.');
        }
    }

}