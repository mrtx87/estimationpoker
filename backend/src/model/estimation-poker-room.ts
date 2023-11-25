import {v4 as UUID} from 'uuid';


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

    public static createEstimationPokerRoom(basicInformation: {creatorName: string, roomTitle: string}, initModeratorId: string): EstimationPokerRoom {
        const estimationPokerRoom = new EstimationPokerRoom({
            id: UUID(),
            title: basicInformation.roomTitle,
            createdAt: Date.now(),
            userIds: [initModeratorId]
        });
        estimationPokerRoom.id = UUID();
        return estimationPokerRoom;
    }

    public static of(init: any): EstimationPokerRoom {
        return new EstimationPokerRoom(init);
    }


}