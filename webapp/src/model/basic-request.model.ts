export class BasicRequest {
    type: string;
    data: any;

    constructor(init: BasicRequest) {
        this.type = init.type;
        this.data = init.data;
    }
}