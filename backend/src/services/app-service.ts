import {
    estimationPokerRoomRepository,
    userService,
    websocketService
} from "../server";

import {v4 as UUID} from 'uuid';

import {ErrorResponse, ResponseCode} from "../controller-config/rest-controller-configurator";
import {logger} from "./s9logger";
import {CREATE_ROOM_ERROR} from "../constants/error-texts";

export class AppService {
    private static INSTANCE: AppService = new AppService();

    public static get appService(): AppService {
        return AppService.INSTANCE;
    }

    private constructor() {
    }

    static startedAt: number = 0;

    public createRoom(roomInitData: { creatorName: string, roomTitle: string }): any {
        try {
            return estimationPokerRoomRepository.createEstimationPokerRoom(roomInitData)
        } catch (error) {
            return error;
        }
    }

    public joinRoomAsNewUser(roomId: string): Promise<any> {
        // TODO
        return Promise.resolve();
    }

    public joinRoom(request: any): any {
        // TODO
    }

    public processDisconnectClient(roomId: string, userId: string) {
        const room = estimationPokerRoomRepository.getRoomById(roomId);
        if (room) {
            console.log(room);
        }
    }

}
