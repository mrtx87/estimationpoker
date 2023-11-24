import {VideoPlayerAction} from "../model/video-player-action";
import {PlaylistCommand} from "../model/playlist-command";
import {EnterRoomResponse} from "../dto/response/enter-room-response";
import {User} from "../model/user";
import {UsersUpdateResponse} from "../dto/response/users-update-response";
import {APP_SECRETS, PURPOSE_DISCONNECTED_CLIENT} from "../constants/constants";
import {Room} from "../model/room";
import {roomRepository} from "../server";

export class WebsocketService {

    private static INSTANCE: WebsocketService = new WebsocketService();

    public static get websocketService(): WebsocketService {
        return WebsocketService.INSTANCE;
    }

    private constructor() {
    }

    messagingService: any;

    getRoom(roomId: string): Room {
        return roomRepository.getRoomById(roomId);
    }

    public notifyUserById(roomId: string, userId: string, object: any) {
        const room = this.getRoom(roomId);
        const userConnection = room.getUserConnectionById(userId);
        const dataWrapped = {path: '/room/client', data: object}
        const data = JSON.stringify(dataWrapped);
        userConnection?.send(data)
    }

    public notifyUsersById(roomId: string, userIds: string[], object: any) {
        const room = this.getRoom(roomId);
        const userConnections = userIds.map(uid => room.getUserConnectionById(uid));
        const dataWrapped = {path: '/room/client', data: object}
        const data = JSON.stringify(dataWrapped);
        userConnections.forEach(userConnection => userConnection?.send(data));
    }

    public notifyAllUsersInRoom(roomId: string,  object: any) {
        const room = this.getRoom(roomId);
        const dataWrapped = {path: '/room', data: object}
        const data = JSON.stringify(dataWrapped);
        const userConnections = room.getUserConnections();
        userConnections.forEach((userConnection: any) => userConnection?.send(data));
    }
}
