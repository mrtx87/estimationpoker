
import {estimationPokerRoomRepository} from "../server";

export class WebsocketService {

    private static INSTANCE: WebsocketService = new WebsocketService();

    public static get websocketService(): WebsocketService {
        return WebsocketService.INSTANCE;
    }

    private constructor() {
    }

    getRoom(roomId: string) {
        return estimationPokerRoomRepository.getRoomById(roomId);
    }

    notifyPlayer(response: any, playerConnection: any) {
        if (playerConnection) {
            playerConnection.send(JSON.stringify(response));
        }
    }

    notifyAllConnections(response: any, connections: any) {
        connections
            .forEach((pConnection: any) => {
                if (pConnection) {
                    pConnection.send(JSON.stringify(response));
                }
            })
    }
}
