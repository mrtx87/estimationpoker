// vuex.d.ts
import {Store} from '@/typings/vuex'
import {BanPollDto} from "@/model/dto/ban-poll-dto";

declare module '@vue/runtime-core' {
    // declare your own store states
    import {ConnectionState, WebsocketService} from "@/services/websocket-service";
    import {GlobalPlayerCookie} from "@/model/global-player-cookie.model";
    import {LobbyState} from "@/model/dto/lobby-state";
    import {PlayerAuthentication} from "@/model/player.authentication";
    import {TermAssigmentSectionState} from "@/model/dto/term-assigment-section-state";
    import {WTFAIGameState} from "@/model/dto/wtfai-game-state.model";
    import {GameOverSectionDTO} from "@/model/dto/game-over-section-dto";
    import {GameOverResult} from "@/model/dto/game-result";
    import {InstantMessage} from "@/model/dto/instant-message";
    import {VoiceChatSessionDTO} from "@/model/dto/voice-chat-session-d-t-o";
    import {WebRTCConnectionSession} from "@/model/WebRTCConnectionSession";

    interface State {
        joining: boolean,
        playerId: string,
        currentGame: WTFAIGameState,
        gameSessionId: string,
        lobby: LobbyState,
        globalPlayerCookie: GlobalPlayerCookie | null,
        playerAuthentication: PlayerAuthentication,
        termAssignment: TermAssigmentSectionState | null,
        bannedPlayers: string[],
        banPoll: BanPollDto | null,
        currentNotification: any,
        gameOver: GameOverSectionDTO | null,
        gameResults: GameOverResult[] | null,
        instantMessages: InstantMessage[],
        voiceChatSignalUpdate: VoiceChatSessionDTO,
        playersInVoiceChat: string[] | null,
        localPlayerIsMuted: boolean,
        fullMute: boolean,
        chosenGameTopic: string,
        localVoiceInputStream: MediaStream | null,
        peerConnections: Map<string, WebRTCConnectionSession>,
        connectionState: ConnectionState,
        displayedOverlayId: string | null,
        initialInteractionDone: boolean
    }

    interface ComponentCustomProperties {
        $websocketService: WebsocketService,
        $emit: any,
        $refs: any
    }
}