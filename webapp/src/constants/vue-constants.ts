export const GameSection = {
    LOBBY_SECTION_ID: 'lobby',
    TERM_ASSIGMENT_SECTION_ID: 'term-assignment',
    GAME_SECTION_ID: 'game',
    GAME_OVER_SECTION_ID: 'game-over'
}

export const RequestMessageType = {
    CREATE_GAME: 'creategame',
    JOIN_GAME: 'join-game-session',
    PLAYER_IN_LOBBY_READY: 'player-in-lobby-ready',
    UPDATE_PLAYER_IN_LOBBY: 'update-player-in-lobby',
    HOST_UPDATE_GAME_CONFIG_IN_LOBBY: 'host-update-game-config-in-lobby',
    START_GAME_IN_LOBBY: 'start-game-in-lobby',
    KICK_PLAYER: 'kick-player',
    INIT_BAN_VOTE: 'init-ban-vote',
    BAN_VOTE: 'ban-vote',
    LOCK_ASSIGNEE: 'lock-assignee',
    ASSIGN_TERM: 'assign-term',
    ASK_QUESTION: 'ask-question',
    CANCEL_ASSIGN_TERM: 'cancel-assign-term',
    CAST_VOTE: 'cast-vote',
    BACK_TO_LOBBY: 'back-to-lobby',
    HINT_REQUEST: 'hint-request',
    HINT_RESPONSE: 'hint-response',
    HINT_ADOPT: 'hint-adopt',
    HINT_GIVEN_CLOSE: 'hint-given-close'
}

export const ResponseMessageTypes = {
    CREATED_NEW_SESSION: 'new-session-created',
    JOINED_GAME_SESSION: 'joined-game-session',
    OPPONENT_JOINED_GAME_SESSION: 'opponent-joined-game-session',
    UPDATED_LOBBY: 'updated-lobby',
    SESSION_CLOSED: 'session-closed',
    SESSION_DOES_NOT_EXISTS:'session-does-not-exists',
    SESSION_ALREADY_RUNNING:'session-already-running',
    BANNED_FROM_GAME_SESSION: 'banned-from-session',
    TERM_ASSIGNMENT_UPDATE: 'term-assignment-update',
    NOTIFY_BANNED_PLAYER: 'notify-banned-player',
    NOTIFY_KICKED_PLAYER: 'notify-kicked-player',
    NOTIFY_OTHERS_ABOUT_BAN: 'notify-others-about-ban',
    UPDATE_BAN_POLL: 'update-ban-poll',
    UPDATE_GAME_ROUND: 'update-game-round',
    UPDATE_GAME_OVER_SECTION: 'update-game-over',
    LOBBY_FULL: 'lobby-full'
}

export const AssignmentModes = {
    FULL_RANDOM : 'full-random',
    ASSIGNEE_KNOWN: 'assignee-known',
    SELECT_ASSIGNEE: 'select-assignee',
}

export const PlayerTurnState = {
    QUESTION_STATE : 'question-state',
    POLL_STATE : 'poll-state',
    HINT_STATE: 'hint-state',
}

export const MenuItemKey = {
    CREATE_NEW_GAME : 'create-new-game',
    BACK_TO_HOME : 'back-to-home'
}

export const Roles = {
    HOST: 'host',
    PARTICIPANT: 'participant'
}

export const InstantMessageType = {
    WARN: 'warn',
    INFO: 'info'
}

export const MAX_PLAYER_IDENTITY_LENGTH = 30;
export const PRIVACY_POLICY_COOKIE_KEY = 'wtfai-privacy';
export const GLOBAL_PLAYER_COOKIE_KEY = 'wtfi_globalPlayer';


export const VOICE_CHAT_CALLS_UPDATE = 'voice-chat.calls-update';
export const SIGNALING_OFFER_PEER_CONNECTION = 'voice-chat.signaling-offer-pc';
export const SIGNALING_ANSWER_PEER_CONNECTION = 'voice-chat.signaling-answer-pc';
export const SIGNALING_BROADCAST_ICE_CANDIDATE = 'voice-chat.broadcast-ice-candidate';
export const WANTS_TO_VOICE_CHAT = 'voice-chat.wants-to-voice-chat';