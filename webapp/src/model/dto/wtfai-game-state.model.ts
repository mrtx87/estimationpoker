import {GamePlayer} from "@/model/game-player";
import {PlayerTurnDTO} from "@/model/dto/player-turn-dto.model";
import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";
import {CheatSheetQuestionDto} from "@/model/dto/cheat-sheet-question-dto";
import {PlayerRankDTO} from "@/model/dto/player-rank-dto";
import {BanPollDto} from "@/model/dto/ban-poll-dto";

export class WTFAIGameState {
    id: number;
    language: string;
    gamePlayers: GamePlayer[];
    currentPlayerId: string;
    currentTurn: PlayerTurnDTO;
    ranking: PlayerRankDTO[];
    disconnectedIds: string[];
    gameOverSectionTransitionTimer: WtfiTimerDto;
    cheatSheet: CheatSheetQuestionDto;
    roundNumber: number;
    banPoll: BanPollDto;
    hintsRemaining: number;

    constructor(init: WTFAIGameState) {
        this.id = init.id;
        this.gamePlayers = init.gamePlayers.map( gp => new GamePlayer(gp, gp.term));
        this.currentPlayerId = init.currentPlayerId;
        this.currentTurn = new PlayerTurnDTO(init.currentTurn);
        this.language = init.language;
        this.ranking = init.ranking;
        this.disconnectedIds = init.disconnectedIds;
        this.gameOverSectionTransitionTimer = init.gameOverSectionTransitionTimer;
        this.cheatSheet = init.cheatSheet;
        this.roundNumber = init.roundNumber;
        this.banPoll = init.banPoll;
        this.hintsRemaining = init.hintsRemaining;
    }
}
