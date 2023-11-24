import {createStore} from 'vuex'
import {State} from 'vue'
import {setCookie} from "@/services/cookie-service";
import {LobbyState} from "@/model/dto/lobby-state";
import {ResponseMessageTypes, VOICE_CHAT_CALLS_UPDATE} from "@/constants/vue-constants";
import {TermAssigmentSectionState} from "@/model/dto/term-assigment-section-state";
import {WTFAIGameState} from "@/model/dto/wtfai-game-state.model";
import {GameOverSectionDTO} from "@/model/dto/game-over-section-dto";
import {GameOverResult} from "@/model/dto/game-result";
import {InstantMessage} from "@/model/dto/instant-message";
import {BanPollDto} from "@/model/dto/ban-poll-dto";
import {Logger} from "@/services/util";
import {VoiceChatSignalUpdate} from "@/model/dto/voice-chat-session-d-t-o";
import {ConnectionState} from "@/services/websocket-service";

// define injection key
// export const key: InjectionKey<Store<State>> = Symbol();


export default createStore<State>({
    state: {
        joining: false,
        playerId: '',
        currentGame: null,
        gameSessionId: '',
        lobby: null,
        globalPlayerCookie: null,
        playerAuthentication: {secret: null},
        termAssignment: null,
        bannedPlayers: [],
        banPoll: null,
        currentNotification: 'hallo',
        gameOver: null,
        gameResults: null,
        instantMessages: [],
        voiceChatSignalUpdate: null,
        playersInVoiceChat: null,
        localPlayerIsMuted: true,
        fullMute: true,
        chosenGameTopic: '',
        localVoiceInputStream: null,
        peerConnections: new Map(),
        connectionState: ConnectionState.PREINIT,
        displayedOverlayId: null,
        initialInteractionDone: false
    },
    mutations: {
        handleIncomingMessage(state, message) {
            Logger.log("<<< websocket incoming", message);

            if (message.type === VOICE_CHAT_CALLS_UPDATE) {
                state.voiceChatSignalUpdate = message.data.voiceChatSignalUpdate ? new VoiceChatSignalUpdate(message.data.voiceChatSignalUpdate) : null;
                state.playersInVoiceChat = message.data.playersInVoiceChat
                return;
            }

            if ('data' in message && message.data.instantMessage) {
                const instantMessage = new InstantMessage(message.data.instantMessage);
                state.instantMessages = [...state.instantMessages, instantMessage];
            }

            /** SESSION CHANGE/REJECTION **/
            if (message.type === ResponseMessageTypes.SESSION_CLOSED) {
                window.location.href = "/";
                state.joining = false;
                return;
            }

            if (message.type === ResponseMessageTypes.SESSION_DOES_NOT_EXISTS ||
                message.type === ResponseMessageTypes.SESSION_ALREADY_RUNNING ||
                message.type === ResponseMessageTypes.BANNED_FROM_GAME_SESSION ||
                message.type === ResponseMessageTypes.LOBBY_FULL) {
                state.joining = false;
                state.gameSessionId = '';
                resetStore(state);
                return;
            }

            /** KICK/BANNING **/
            if (message.type === ResponseMessageTypes.NOTIFY_BANNED_PLAYER || message.type === ResponseMessageTypes.NOTIFY_KICKED_PLAYER) {
                resetStore(state);
                state.gameSessionId = '';
                return;
            }

            if (message.type === ResponseMessageTypes.UPDATE_BAN_POLL) {
                state.banPoll = new BanPollDto(message.data);
                return;
            }


            /** NORMAL GAME UPDATES **/

            //UPDATE GAME
            state.playersInVoiceChat = message.data.playersInVoiceChat ? message.data.playersInVoiceChat : [];
            state.lobby = message.data.lobby ? new LobbyState(message.data.lobby) : null;
            state.termAssignment = message.data.termAssignment ? new TermAssigmentSectionState(message.data.termAssignment) : null;
            state.currentGame = message.data.game ? new WTFAIGameState(message.data.game) : null;
            state.gameOver = message.data.gameOverSection ? new GameOverSectionDTO(message.data.gameOverSection) : null;
            state.gameResults = message.data.gameResults ? message.data.gameResults.map((res: GameOverResult) => new GameOverResult(res)) : null;
            state.chosenGameTopic = message.data.chosenGameTopic ? message.data.chosenGameTopic : null;
            state.banPoll = state.currentGame ? state.currentGame.banPoll : null;

            if (message.type === ResponseMessageTypes.CREATED_NEW_SESSION) {
                const gameSessionId = message.data.gameSessionId;
                setCookie(gameSessionId, message.data.playerAuthentication.secret);
                if (state.gameSessionId) {
                    location.assign(`/${gameSessionId}`)
                    return;
                }

                state.gameSessionId = gameSessionId;
                state.playerId = message.data.playerId;
                state.playerAuthentication = message.data.playerAuthentication;
                replaceCurrentUrl(message.data.gameSessionId);
                state.joining = false;
                return;
            }

            if (message.type === ResponseMessageTypes.JOINED_GAME_SESSION) {
                const gameSessionId = message.data.gameSessionId;
                state.gameSessionId = gameSessionId;
                state.playerId = message.data.playerId;
                state.playerAuthentication = message.data.playerAuthentication;
                setCookie(gameSessionId, message.data.playerAuthentication.secret);
                state.joining = false;
                return;
            }

            if (message.type === ResponseMessageTypes.OPPONENT_JOINED_GAME_SESSION) {
                return;
            }

            if (message.type === ResponseMessageTypes.UPDATED_LOBBY) {
                return;
            }

            if (message.type === ResponseMessageTypes.TERM_ASSIGNMENT_UPDATE) {
                return;
            }

            if (message.type === ResponseMessageTypes.UPDATE_GAME_ROUND) {
                return;
            }

        },
        updatePeerConnections(state, peerConnections) {
            state.peerConnections = peerConnections;
        },
        updateLocalVoiceInputStream(state, localStream) {
            state.localVoiceInputStream = localStream;
        },
        updateLocalPlayerIsMuted(state, isMuted) {
            state.localPlayerIsMuted = isMuted;
        },
        updateSessionId(state, sessionId) {
            state.gameSessionId = sessionId;
        },
        updateJoining(state, joining) {
            state.joining = joining;
        },
        updateConnectionState(state, c_state) {
            state.connectionState = c_state;
        },
        updateGlobalCookie(state, globalPlayerCookie) {
            state.globalPlayerCookie = globalPlayerCookie;
        },
        updateLobby(state, lobby) {
            state.lobby = lobby;
        },
        updateFullMute: function (state, mute) {
            state.fullMute = mute;
        },
        updateDisplayedOverlayId: function (state, overlayId) {
            state.displayedOverlayId = overlayId;
        },
        updateInitialInteractionDone: function (state, initialInteractionDone) {
            state.initialInteractionDone = initialInteractionDone;
        },
        removeInstantMessage(state, removeId) {
            state.instantMessages = state.instantMessages.filter(im => im.id !== removeId);
        },
        initStore: function (state, resetData) {
            state.currentGame = null;
            state.playerId = '';
            state.termAssignment = null;
            state.lobby = null;
            state.gameOver = null;
            state.playerAuthentication = null;
        }
    },
    actions: {},
    getters: {
        globalPlayerCookie: state => {
            return state.globalPlayerCookie
        }
    },
    modules: {}
})

export function replaceCurrentUrl(gameSessionId: string): void {
    const i = window.location.href.lastIndexOf('/')
    const url = window.location.href.substring(0, i + 1) + gameSessionId;
    const nextTitle = 'Who the fuck am I ? - ' + gameSessionId;
    const nextState = {additionalInformation: 'updated via app'};
    window.history.replaceState(nextState, nextTitle, url);
}

export function pushPathToHistory(gameSessionId: string): void {
    const i = window.location.href.lastIndexOf('/')
    const url = window.location.href.substring(0, i + 1) + gameSessionId;
    const nextTitle = 'Who the fuck am I ? - ' + gameSessionId;
    const nextState = {additionalInformation: 'updated via app'};
    window.history.pushState(nextState, nextTitle, url);
}

export function resetStore(state: State) {
    state.currentGame = null;
    state.playerId = '';
    state.termAssignment = null;
    state.lobby = null;
    state.gameOver = null;
    state.playerAuthentication = null;
}


