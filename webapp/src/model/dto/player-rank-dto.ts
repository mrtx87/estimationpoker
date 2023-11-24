export class PlayerRankDTO {
    id: string;
    position: number;

    constructor(init: PlayerRankDTO) {
        this.id = init.id;
        this.position = init.position;
    }
}