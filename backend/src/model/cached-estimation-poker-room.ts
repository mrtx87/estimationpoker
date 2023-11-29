import {v4 as UUID} from 'uuid';
import {User} from "./user";
import {EstimationPokerRoom} from "./estimation-poker-room";
import {RoomSettings} from "./room-settings";
import {Estimation} from "./estimation";

export class CachedPublicEstimationPokerRoom {
    id: string;
    createdAt: number;
    users: User[];
    roomSettings: RoomSettings;
    currentEstimation: Estimation

    constructor(init: Partial<CachedEstimationPokerRoom>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.users = init.users;
        this.roomSettings = init.roomSettings;
        this.currentEstimation = init.currentEstimation;
    }
}

export class CachedEstimationPokerRoom extends CachedPublicEstimationPokerRoom {
    connections: any[];

    constructor(init: Partial<CachedEstimationPokerRoom>) {
        super(init);
        this.connections = [];
    }

    addConnection(connection: any) {
        this.connections.push(connection);
    }

    removeConnection(connection: any) {
        this.connections = this.connections.filter(c => c !== connection);
    }

    removeUser(userId: string) {
        this.users = this.users.filter(u => u.id !== userId);
    }

    toPublicDTO(): CachedPublicEstimationPokerRoom {
        const c =  new CachedEstimationPokerRoom(this);
        c.connections = this.connections.map(c => c.userId);
        return c;
    }

    static from(dbRoom: EstimationPokerRoom, users: User[], currentEstimation: Estimation) {
        return new CachedEstimationPokerRoom({
            id: dbRoom.id,
            createdAt: dbRoom.createdAt,
            users: users,
            roomSettings: dbRoom.roomSettings,
            currentEstimation: currentEstimation
        })
    }

}