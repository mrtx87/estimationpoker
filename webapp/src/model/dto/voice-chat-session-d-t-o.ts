export class VoiceChatSignalUpdate {
    gameSessionId: string;
    from: string;
    to: string;
    data: any;

    constructor(init: VoiceChatSignalUpdate) {
        this.gameSessionId = init.gameSessionId;
        this.from = init.from;
        this.to = init.to;
        this.data =  init.data;
    }
}
