import {BasicRequest} from "./basic-request.model";

export class AuthenticatedRequest extends BasicRequest{
    roomId: string;
    userId: string;

    constructor(init: AuthenticatedRequest) {
        super(init);
        this.roomId = init.roomId;
        this.userId = init.userId;
    }
}