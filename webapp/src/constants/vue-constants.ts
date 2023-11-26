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