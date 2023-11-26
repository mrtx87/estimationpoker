export class BasicResponse {
    sender: string;
    type: string;
    data: any;

    constructor( type: string, sender: string = 'system', data: any = null) {
        this.type = type;
        this.sender = sender;
        this.data = data;
    }
}