export class BasicRequest {
    type: string;
    data: any;

    constructor(init: Partial<BasicRequest>) {
        this.type = init.type;
        this.data = init.data;
    }
}