import {v4 as UUID} from 'uuid';
import {CachedEstimationPokerRoom} from "./cached-estimation-poker-room";
import {RoomSettings} from "./room-settings";


export class EstimationPokerRoom {
    id: string;
    createdAt: number;
    roomSettings: RoomSettings
    currentEstimationId: string;
    estimationCount: number;

    constructor(init: Partial<EstimationPokerRoom>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.roomSettings = init.roomSettings;
        this.currentEstimationId = init.currentEstimationId;
        this.estimationCount = init.estimationCount;
    }

    public static createEstimationPokerRoom(roomSettings: RoomSettings, initEstimationId: string): EstimationPokerRoom {
        const estimationPokerRoom = new EstimationPokerRoom({
            id: UUID(),
            createdAt: Date.now(),
            estimationCount: 1,
            roomSettings: new RoomSettings(roomSettings),
            currentEstimationId: initEstimationId
        });
        estimationPokerRoom.id = UUID();
        return estimationPokerRoom;
    }

    public static of(init: any): EstimationPokerRoom {
        return new EstimationPokerRoom(init);
    }

    public static from(cachedRoom: CachedEstimationPokerRoom) {
        return new EstimationPokerRoom({
            id: cachedRoom.id,
            createdAt: cachedRoom.createdAt,
            roomSettings: cachedRoom.roomSettings,
            currentEstimationId: cachedRoom.currentEstimation.id,
            estimationCount: cachedRoom.estimationCount
        });
    }


}