
import {estimationPokerRoomRepository} from "../server";
import {BasicResponse} from "../model/basic-response.model";

export class WebsocketService {

    private static INSTANCE: WebsocketService = new WebsocketService();

    public static get websocketService(): WebsocketService {
        return WebsocketService.INSTANCE;
    }

    private constructor() {
    }

    notifyPlayer(response: BasicResponse, playerConnection: any) {
        if (playerConnection) {
            playerConnection.send(JSON.stringify(response));
        }
    }

    notifyConnections(response: BasicResponse, connections: any[]) {
        connections
            .forEach((pConnection: any) => {
                if (pConnection) {
                    pConnection.send(JSON.stringify(response));
                }
            })
    }
}
