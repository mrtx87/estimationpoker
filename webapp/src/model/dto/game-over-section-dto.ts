import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";
import {Player} from "@/model/player.model";
import {GameOverResult} from "@/model/dto/game-result";

export class GameOverSectionDTO {

    gameId: number;
    gameOverResult: GameOverResult
    hostDisconnectedTimer: WtfiTimerDto;
    connectedPlayers: Player[];

    constructor(gameOverSection: GameOverSectionDTO) {
        this.gameId = gameOverSection.gameId;
        this.gameOverResult = gameOverSection.gameOverResult;
        this.hostDisconnectedTimer = gameOverSection.hostDisconnectedTimer;
        this.connectedPlayers = gameOverSection.connectedPlayers;
    }
}