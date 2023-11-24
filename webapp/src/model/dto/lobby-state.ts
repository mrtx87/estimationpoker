import {GameConfig} from "../game-config.model";
import {LobbyPlayerDto} from "./lobby-player-dto";
import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";

export class LobbyState {
    lobbyPlayers: LobbyPlayerDto[];
    gameConfig: GameConfig;
    hostDisconnected: WtfiTimerDto;
    termAssignmentStartsTimer: WtfiTimerDto;

    constructor(init: LobbyState) {
        this.lobbyPlayers = init.lobbyPlayers;
        this.gameConfig = init.gameConfig;
        this.hostDisconnected = init.hostDisconnected;
        this.termAssignmentStartsTimer = init.termAssignmentStartsTimer;
    }
}