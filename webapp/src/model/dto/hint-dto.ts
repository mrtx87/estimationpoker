export class HintDto {
    requesterId: string;
    responderId: string;
    content: string;

    constructor(init: HintDto) {
        this.requesterId = init.requesterId;
        this.responderId = init.responderId;
        this.content = init.content;
    }
}