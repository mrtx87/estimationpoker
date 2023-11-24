import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";

export class GameOverResultPlayer {
    id: string;
    name: string;
    term: string;
    rank: number;
    avatar: WTFAIAvatar;

    constructor(init: GameOverResultPlayer) {
        this.id = init.id;
        this.name = init.name;
        this.term = init.term;
        this.rank = init.rank;
        this.avatar = init.avatar;
    }
}