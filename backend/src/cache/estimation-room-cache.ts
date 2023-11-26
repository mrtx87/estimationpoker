import {CachedEstimationPokerRoom} from "../model/cached-estimation-poker-room";


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

    getAllRoomsFromCache() {
        return [...this.roomCache.values()];
    }

}
