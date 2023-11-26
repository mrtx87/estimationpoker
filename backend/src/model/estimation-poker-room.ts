import {v4 as UUID} from 'uuid';
import {CachedEstimationPokerRoom} from "./cached-estimation-poker-room";
import {User} from "./user";


export class EstimationPokerRoom {
    id: string;
    createdAt: number;
    title: string;
    userIds: string[]

    constructor(init: Partial<EstimationPokerRoom>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.title = init.title;
        this.userIds = init.userIds;
    }

    public static createEstimationPokerRoom(roomTitle: string, initModeratorId: string): EstimationPokerRoom {
        const estimationPokerRoom = new EstimationPokerRoom({
            id: UUID(),
            title: roomTitle,
            createdAt: Date.now(),
            userIds: [initModeratorId]
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
            title: cachedRoom.title,
            userIds: cachedRoom.users.map(u => u.id)
        });
    }


}