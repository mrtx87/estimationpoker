import {Player} from "../player.model";

export class LobbyPlayerDto extends Player{
    ready: boolean

    constructor(init: LobbyPlayerDto) {
        super(init);
        this.ready = init.ready;
    }
}