import {v4 as UUID} from 'uuid';
import {User} from "./user";
import {EstimationPokerRoom} from "./estimation-poker-room";
import {RoomSettings} from "./room-settings";
import {Estimation} from "./estimation";
import {Vote} from "./vote";
import {ResponseMessageType, ROLE, VOTING_STATE} from "../constants/global";
import {maskVoteValues} from "../util/util";

export class CachedPublicEstimationPokerRoom {
    id: string;
    createdAt: number;
    users: User[];
    roomSettings: RoomSettings;
    estimationCount: number;
    currentEstimation: Estimation

    constructor(init: Partial<CachedEstimationPokerRoom>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.users = init.users;
        this.estimationCount = init.estimationCount;
        this.roomSettings = RoomSettings.of(init.roomSettings);
        this.currentEstimation = Estimation.of(init.currentEstimation);
    }
}

export class CachedEstimationPokerRoom extends CachedPublicEstimationPokerRoom {
    connections: any[];

    constructor(init: Partial<CachedEstimationPokerRoom>) {
        super(init);
        this.connections = [];
    }

    addConnection(connection: any) {
        const connections = this.connections.filter(c => c.userId !== connection.userId);
        connections.push(connection);
        this.connections = connections;
    }

    removeConnection(connection: any) {
        this.connections = this.connections.filter(c => c !== connection);
    }

    removeUser(userId: string) {
        this.users = this.users.filter(u => u.id !== userId);
    }

    getUser(userId: string) {
        return this.users.find(u => u.id === userId);
    }

    getVotes() {
        return this.currentEstimation.votes;
    }

    setEstimation(estimation: Estimation) {
        this.currentEstimation = estimation;
    }

    toPublicDTO(userId = ''): CachedPublicEstimationPokerRoom {
        const dto = new CachedEstimationPokerRoom(this);
        dto.connections = this.connections.map(c => c.userId);

        if (this.currentEstimation.state === VOTING_STATE.REVEALED) {
            return dto;
        }

        if (!this.roomSettings.realtimeVoting) {
            dto.setVotes(maskVoteValues(this.getVotes()));
            return dto;
        }

        if(this.getUser(userId).roles.includes(ROLE.OBSERVER)) {
            return dto;
        }

        dto.setVotes(maskVoteValues(this.getVotes()));
        return dto;
    }

    setVotes(votes: Vote[]) {
        this.currentEstimation.votes = votes;
    }

    getAllConnectionsByRole(role: string) {
        return this.connections.filter(connection => {
            const foundUser = this.users.find(u => u.id === connection.userId);
            return foundUser.roles.includes(role);
        });
    }
    getAllConnectionsWithoutRole(role: string) {
        return this.connections.filter(connection => {
            const foundUser = this.users.find(u => u.id === connection.userId);
            return !foundUser.roles.includes(role);
        });
    }


    static from(dbRoom: EstimationPokerRoom, users: User[], currentEstimation: Estimation) {
        return new CachedEstimationPokerRoom({
            id: dbRoom.id,
            createdAt: dbRoom.createdAt,
            users: users,
            roomSettings: dbRoom.roomSettings,
            currentEstimation: currentEstimation,
            estimationCount: dbRoom.estimationCount
        })
    }

}