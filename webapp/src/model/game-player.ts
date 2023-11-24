import {Player} from "./player.model";

export class GamePlayer extends Player{
    term: string;

    constructor(init: Partial<Player>, term: string) {
        super(init);
        this.term = term;
    }
}
