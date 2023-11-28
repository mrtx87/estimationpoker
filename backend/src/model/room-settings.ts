import {ValueByAmount} from "./value-by-number";
import {ValueOptions} from "./value-option";

export class RoomSettings {
    title: string;
    valueOptions: ValueOptions;
    realTimeVoting: boolean;
    voteAfterReveal: boolean;
    autoReveal: boolean;

    constructor(init: Partial<RoomSettings>) {
        this.title = init.title;
        this.valueOptions = init.valueOptions;
        this.realTimeVoting = init.realTimeVoting;
        this.voteAfterReveal = init.voteAfterReveal;
        this.autoReveal = init.autoReveal;
    }

    public static of(init: any): RoomSettings {
        return new RoomSettings(init);
    }


}