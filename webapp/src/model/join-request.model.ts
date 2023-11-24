import {GlobalPlayerCookie} from "./global-player-cookie.model";

export class JoinRequest {
    gameSessionId: string;
    secret: string;
    globalPlayerCookie: GlobalPlayerCookie

    constructor(init: JoinRequest) {
        this.gameSessionId = init.gameSessionId;
        this.secret = init.secret;
        this.globalPlayerCookie = init.globalPlayerCookie;
    }
}