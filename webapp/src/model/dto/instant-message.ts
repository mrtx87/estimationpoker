export class InstantMessage {
    type: string;
    message: string;
    ttl: number;
    id: string;
    timeOutId: any;

    constructor(init: any) {
        this.id = init.id;
        this.type = init.type;
        this.message = init.message;
        this.ttl = init.ttl;
    }

}