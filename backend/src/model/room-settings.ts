import {ValueByAmount} from "./value-by-number";
import {ValueOptions} from "./value-option";

export class RoomSettings {
    title: string;
    valueOptionsId: number;
    realtimeVoting: boolean;

    constructor(init: Partial<RoomSettings>) {
        this.title = init.title;
        this.valueOptionsId = init.valueOptionsId;
        this.realtimeVoting = init.realtimeVoting;
    }

    public static of(init: any): RoomSettings {
        return new RoomSettings(init);
    }


}