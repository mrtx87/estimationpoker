import {CachedEstimationPokerRoom} from "./cached-estimation-poker-room";
import {User} from "./user";


export class EstimationPokerRoomPreview {
    id: string;
    title: string;
    createdAt: number;
    userCount: number
    estimationCount: number;
    localUser: User;

    constructor(init: Partial<CachedEstimationPokerRoom>, user: User) {
        this.id = init.id;
        this.title = init.roomSettings.title;
        this.createdAt = init.createdAt;
        this.userCount = init.users.length;
        this.estimationCount = init.estimationCount;
        this.localUser = user;
    }

    public static from(cachedRoom: CachedEstimationPokerRoom, user: User) {
        return new EstimationPokerRoomPreview(cachedRoom, user);
    }


}