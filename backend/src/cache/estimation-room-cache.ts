import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";
import {User} from "../model/user";
import {estimationRoomCache} from "../server";


export class EstimationRoomCache {

    private roomCache: Map<string, CachedEstimationPokerRoom> = new Map<string, CachedEstimationPokerRoom>();
    private static INSTANCE: EstimationRoomCache = new EstimationRoomCache();
    public static get estimationRoomCache(): EstimationRoomCache {
        return EstimationRoomCache.INSTANCE;
    }

    private constructor() {
    }

    getCachedRoom(roomId:string) {
        return this.roomCache.get(roomId);
    }

    addRoomToCache(roomToCache: CachedEstimationPokerRoom) {
        this.roomCache.set(roomToCache.id, roomToCache);
    }

    addUserToRoomIfCached(roomId: string, user: User) {
        const cachedRoom = this.getCachedRoom(roomId);
        if (cachedRoom) {
            cachedRoom.users.push(user);
        }
    }

    getAllRoomsFromCache() {
        return [...this.roomCache.values()];
    }

}
