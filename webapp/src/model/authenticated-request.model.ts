import {BasicRequest} from "./basic-request.model";

export class AuthenticatedRequest extends BasicRequest{
    token: string;
    constructor(init: AuthenticatedRequest) {
        super(init);
        this.token = init.token;
    }
}