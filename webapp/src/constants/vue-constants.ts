export const RequestMessageType = {
    CREATE_GAME: 'create-room',
    JOIN_GAME: 'finalize-join',

}

export const ResponseMessageTypes = {
    CREATED_NEW_SESSION: 'finalized.join',
    JOINED_GAME_SESSION: 'finalized.join',
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
    MODERATOR: 'moderator',
    PARTICIPANT: 'participant',
    SPECTATOR: 'spectator'
}

export const MAX_PLAYER_IDENTITY_LENGTH = 30;
export const PRIVACY_POLICY_COOKIE_KEY = 'estimation-poker-privacy';
export const GLOBAL_PLAYER_COOKIE_KEY = 'estimation-poker-sessions';


export const VOICE_CHAT_CALLS_UPDATE = 'voice-chat.calls-update';
export const SIGNALING_OFFER_PEER_CONNECTION = 'voice-chat.signaling-offer-pc';
export const SIGNALING_ANSWER_PEER_CONNECTION = 'voice-chat.signaling-answer-pc';
export const SIGNALING_BROADCAST_ICE_CANDIDATE = 'voice-chat.broadcast-ice-candidate';
export const WANTS_TO_VOICE_CHAT = 'voice-chat.wants-to-voice-chat';

export const DISPLAY_OVERLAY_STATE = {
    NO_OVERLAY: 0,
    AVATAR_EDITOR: 1,
    IMPRESSUM: 2,
    DSGVO: 3,
    ROOM_SETTING: 4,
    BURGER_MENU: 5,
    HOME: 6,
}


/** ROUTES **/

export const ROOM_ROUTE = '/estimations/room/'