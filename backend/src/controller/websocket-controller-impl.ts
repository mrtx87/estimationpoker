import {AuthenticatedRequest} from "../model/authenticated-request.model";


const MongoClient = require("mongodb").MongoClient;

export class WebsocketControllerImpl {
    private static INSTANCE: WebsocketControllerImpl = new WebsocketControllerImpl();

    public static get websocketControllerImpl(): WebsocketControllerImpl {
        return WebsocketControllerImpl.INSTANCE;
    }

    public constructor() {
    }

    onPlayerMessageIncoming(playerConnection: any, data: any) {
        try {
            const request = JSON.parse(data);

            if ('ping' in request) {
                return;
            }

            console.log(request)

        } catch (e) {
            console.log(e);
        }
    }

}