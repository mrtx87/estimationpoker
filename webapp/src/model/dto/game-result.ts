import {GameOverResultPlayer} from "@/model/dto/game-over-result-player";

export class GameOverResult {
    readonly gameId: number;
    readonly top3: GameOverResultPlayer[];
    readonly bottomPlayers: GameOverResultPlayer[];

    constructor(gameOverResult: GameOverResult) {
        this.top3 = gameOverResult.top3;
        this.bottomPlayers = gameOverResult.bottomPlayers;
        this.gameId = gameOverResult.gameId;
    }
}