import {AuthenticatedRequest} from "../model/authenticated-request.model";
import {BasicRequest} from "../model/basic-request.model";
import {ROLE} from "../constants/global";
import {userService, websocketService} from "../server";
import {BasicResponse} from "../model/basic-response.model";
import {logger} from "../services/s9logger";


const MongoClient = require("mongodb").MongoClient;


export class WebsocketControllerImpl {
    private static INSTANCE: WebsocketControllerImpl = new WebsocketControllerImpl();

    websocketControllerEndpoints: Map<string, WebsocketControllerEndpoint> = new Map<string, WebsocketControllerEndpoint>();

    public static get websocketControllerImpl(): WebsocketControllerImpl {
        return WebsocketControllerImpl.INSTANCE;
    }

    addWebsocketEndpoint(config: WebsocketControllerEndpoint) {
        this.websocketControllerEndpoints.set(config.type, config);
        return this;
    }

    private constructor() {
        this.applyConfigSettings();
    }

    applyConfigSettings() {
        this.addWebsocketEndpoint({
            type: 'finalize-join',
            action: this.finalizeJoin.bind(this),
            requiredRole: [ROLE.PARTICIPANT, ROLE.MODERATOR, ROLE.SPECTATOR]
        }).addWebsocketEndpoint({
            type: 'ping',
            action: this.ping.bind(this),
            requiredRole: [ROLE.PARTICIPANT, ROLE.MODERATOR, ROLE.SPECTATOR]
        })
    }

    onPlayerMessageIncoming(request: AuthenticatedRequest, playerConnection: any) {
        try {
            const endPoint = this.websocketControllerEndpoints.get(request.type);
            if (!endPoint) {
                //TODO answer
            }
            const authenticated = userService.authenticateToken(request.token);
            if (!authenticated) {
                //TODO answer
            }

            endPoint.action(authenticated.roomId, authenticated.userId, new BasicRequest(request), playerConnection);

        } catch (e) {
            console.log(e);
        }
    }

    finalizeJoin(roomId: string, userId: string, request: AuthenticatedRequest, playerConnection: any) {
        // add room to cache if not there
        // send all required data for join to users
        websocketService.notifyConnections( new BasicResponse('finalized.join', userId), [playerConnection]);
    }

    ping(roomId: string, userId: string, request: AuthenticatedRequest, playerConnection: any) {
        logger.log(request.type + ':' + userId);
    }


}

export class WebsocketControllerEndpoint {
    type: string;
    action: (roomId: string, userId: string, request: BasicRequest, connection: any) => void;
    requiredRole: string[]

    constructor(init: WebsocketControllerEndpoint) {
        this.requiredRole = init.requiredRole;
        this.action = init.action;
        this.type = init.type;
    }
}