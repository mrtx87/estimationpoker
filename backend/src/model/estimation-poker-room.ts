import {v4 as UUID} from 'uuid';
import {CachedEstimationPokerRoom} from "./cached-estimation-poker-room";
import {RoomSettings} from "./room-settings";


export class EstimationPokerRoom {
    id: string;
    createdAt: number;
    roomSettings: RoomSettings

    constructor(init: Partial<EstimationPokerRoom>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.roomSettings = init.roomSettings;
    }

    public static createEstimationPokerRoom(roomSettings: RoomSettings): EstimationPokerRoom {
        const estimationPokerRoom = new EstimationPokerRoom({
            id: UUID(),
            createdAt: Date.now(),
            roomSettings: new RoomSettings(roomSettings)
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
        });
    }


}