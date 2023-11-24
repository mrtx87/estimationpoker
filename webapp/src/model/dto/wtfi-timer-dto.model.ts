export class WtfiTimerDto {
    type: string;
    ttl: number;
    done: boolean;
    updateTimestamp: number;

    constructor(init: WtfiTimerDto) {
        this.type = init.type;
        this.ttl = init.ttl;
        this.done = init.done;
        this.updateTimestamp = init.updateTimestamp;
    }
}