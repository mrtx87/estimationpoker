import {AssigningPlayerDTO} from "@/model/dto/assigining-player-dto";
import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";

export class TermAssigmentSectionState {

    mode: string;
    assignmentPlayers: AssigningPlayerDTO[];
    backToLobbyTimer: WtfiTimerDto;
    gameStartsTimer: WtfiTimerDto;
    assignedPlayersCount: number;
    language: string;
    deadLockPrevention: any;

    constructor(init: TermAssigmentSectionState) {
        this.assignmentPlayers = init.assignmentPlayers;
        this.mode = init.mode;
        this.backToLobbyTimer = init.backToLobbyTimer;
        this.gameStartsTimer = init.gameStartsTimer;
        this.assignedPlayersCount = init.assignedPlayersCount;
        this.language = init.language;
        this.deadLockPrevention = init.deadLockPrevention;

    }
}
