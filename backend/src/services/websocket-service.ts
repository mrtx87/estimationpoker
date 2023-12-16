import {BasicResponse} from "../model/basic-response.model";

export class WebsocketService {

    private static INSTANCE: WebsocketService = new WebsocketService();

    public static get websocketService(): WebsocketService {
        return WebsocketService.INSTANCE;
    }

    private constructor() {
    }

    notifyUser(response: BasicResponse, connection: any) {
        if (connection) {
            connection.send(JSON.stringify(response));
        }
    }

    notifyUsers(response: BasicResponse, connections: any[]) {
        connections
            .forEach((pConnection: any) => {
                if (pConnection) {
                    pConnection.send(JSON.stringify(response));
                }
            })
    }
}
