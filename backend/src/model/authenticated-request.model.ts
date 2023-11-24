import {BasicRequest} from "@/model/basic-request.model";
import {PlayerAuthentication} from "@/model/player.authentication";

export class AuthenticatedRequest extends BasicRequest{
    playerAuthentication: PlayerAuthentication;
    gameSessionId: string;

    constructor(init: AuthenticatedRequest) {
        super(init);
        this.playerAuthentication = init.playerAuthentication;
        this.gameSessionId = init.gameSessionId;
    }
}