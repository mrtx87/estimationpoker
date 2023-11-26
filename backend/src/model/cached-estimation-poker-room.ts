import {v4 as UUID} from 'uuid';
import {User} from "./user";
import {EstimationPokerRoom} from "./estimation-poker-room";


export class CachedEstimationPokerRoom {
    id: string;
    createdAt: number;
    title: string;
    users: User[]
    connections: any[];

    constructor(init: Partial<CachedEstimationPokerRoom>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.title = init.title;
        this.users = init.users;
        this.connections = init.connections;
    }

    addConnection(connection: any) {
        this.connections.push(connection);
    }

    removeConnection(connection:any) {
        this.connections = this.connections.filter(c => c !== connection);
    }

    static from(dbRoom: EstimationPokerRoom, users: User[], connection:any = null) {
        return new CachedEstimationPokerRoom({
            id: dbRoom.id,
            title: dbRoom.title,
            createdAt: dbRoom.createdAt,
            users: users,
            connections: connection ? [connection] : []
        })
    }




}