import {User} from "./user";

export class InitValues {
    roomId: string;
    token:string;


    constructor(init: Partial<InitValues>) {
        this.roomId = init.roomId;
        this.token = init.token;
    }


}
