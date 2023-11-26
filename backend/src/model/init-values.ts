import {User} from "./user";

export class InitValues {
    roomId: string;
    token:string;
    user: User;


    constructor(init: Partial<InitValues>) {
        this.user = init.user;
        this.roomId = init.roomId;
        this.token = init.token;
    }


}
