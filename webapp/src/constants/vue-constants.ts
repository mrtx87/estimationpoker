export const RequestMessageType = {
    FINALIZE_JOIN: 'finalize-join',
    JOIN_GAME: 'join-session',
    PING: 'ping',
    REVEAL_VOTES: 'reveal-votes',
    RESET_VOTES: 'reset-votes',
    NEXT_ESTIMATION: 'next-estimation',
    DELETE_ROOM: 'delete-room',
    DELETE_USER: 'delete-user',
    CHANGE_ROLE: 'change-role',
    CHANGE_USER: 'change-user',
    CHANGE_ROOM_SETTINGS: 'change-room-settings',
    CHANGE_ESTIMATION_TITLE: 'change-estimation-title',
    VOTE_REQUEST: 'vote-request'
}

export const ResponseMessageType = {
    JOINED_ESTIMATION_SESSION: 'finalized.join',
    ANOTHER_USER_JOINED_SESSION: 'another.user.joined',
    ROOM_NOT_EXISTING: 'room.not.existing',
    USER_DISCONNECTED: 'user.disconnected.room',
    ROOM_DELETED: 'room.deleted',
    USER_NOT_EXISTING: 'user.not.existing',
    USER_DELETED: 'user.deleted',
    REVEALED_VOTES: 'revealed.votes',
    RESETED_VOTES: 'reseted.votes',
    ESTIMATION_UPDATED: 'estimation.updated',
    NEXT_ESTIMATION: 'next.estimation',
    ESTIMATION_TITLE_UPDATED: 'estimation.title.updated',
    ACTION_UNKNOWN: 'action.unknown',
    UNKNOWN_USER: 'user.unknown',
    REMOVED_FROM_ROOM: 'user.removed.from.room',
    UPDATED_ROOM_SETTINGS: 'room.settings.updated',
    CHANGED_USER: 'user.updated',
    CHANGED_USER_ROLE: 'user.role.updated',
    USER_VOTED: 'user.voted',
    NOT_PERMITTED: 'user.not.permitted',
    ERROR_REVEALING_VOTES: 'error.revealing.votes',
    ERROR_RESETTING_VOTES: 'error.resetting.votes',
    ERROR_GENERATING_NEXT_ESTIMATION: 'error.generating.next.estimation',
    ERROR_DELETING_ROOM: 'error.deleting.room',
    ERROR_DELETING_USER: 'error.deleting.user',
    ERROR_CHANGING_ROLE: 'error.changing.role',
    ERROR_CHANGING_AVATAR: 'error.changing.avatar',
    ERROR_CHANGING_USER_NAME: 'error.changing.user.name',
    ERROR_CHANGING_ROOM_SETTINGS: 'error.changing.room.settings',
    ERROR_CHANGING_ESTIMATION_TITLE: 'error.changing.estimation.title',
    ERROR_PROCESSING_USER_VOTE: 'error.processing.user.vote',
    ERROR_FINALIZING_JOIN: 'error.finalizing.join',
}

export const MenuItemKey = {
    CREATE_NEW_GAME: 'create-new-game',
    BACK_TO_HOME: 'back-to-home'
}

export const Roles = {
    MODERATOR: 'moderator',
    PLAYER: 'player',
    OBSERVER: 'observer'
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
    JOIN_ROOM: 7,
    CREATE_ROOM: 8,
    ROOM_SETTINGS: 9,
    PROMPT: 10,
    DATENSCHUTZ: 11
}

/** ROUTES **/

export const ROOM_ROUTE = '/estimations/room/';
export const HOME_ROUTE = '/';

/** VALUE TYPES AND COLORS **/

export const COLOR_1 = '#EEF9FB';
export const COLOR_2 = '#BCE6F0';
export const COLOR_3 = '#59C0D9';
export const COLOR_4 = '#BCE784';
export const COLOR_5 = '#90D733';
export const COLOR_6 = '#FAF33E';
export const COLOR_7 = '#E08115';
export const COLOR_8 = '#DB5776';
export const COLOR_9 = '#BA274A';
export const COLOR_10 = '#651528';
export const COLOR_11 = '#22070D';
export const COLOR_12 = '#AFAFAF';

export const fibonacci = {
    id: 1,
    name: 'Fibonacci',
    values: [
        {label: '0', color: COLOR_1, numericValue: 0},
        {label: '1', color: COLOR_2, numericValue: 1},
        {label: '2', color: COLOR_3, numericValue: 2},
        {label: '3', color: COLOR_4, numericValue: 3},
        {label: '5', color: COLOR_5, numericValue: 5},
        {label: '8', color: COLOR_6, numericValue: 8},
        {label: '13', color: COLOR_7, numericValue: 13},
        {label: '21', color: COLOR_8, numericValue: 21},
        {label: '34', color: COLOR_9, numericValue: 34},
        {label: '55', color: COLOR_10, numericValue: 55},
        {label: '89', color: COLOR_11, numericValue: 89},
        {label: '?', color: COLOR_12, numericValue: -1}
    ]
}

export const scrum = {
    id: 2,
    name: 'Scrum',
    values: [
        {label: '0', color: COLOR_1, numericValue: 0},
        {label: '0.5', color: COLOR_2, numericValue: 0.5},
        {label: '1', color: COLOR_3, numericValue: 1},
        {label: '2', color: COLOR_4, numericValue: 2},
        {label: '3', color: COLOR_5, numericValue: 3},
        {label: '5', color: COLOR_6, numericValue: 5},
        {label: '8', color: COLOR_7, numericValue: 8},
        {label: '13', color: COLOR_8, numericValue: 13},
        {label: '20', color: COLOR_9, numericValue: 20},
        {label: '40', color: COLOR_10, numericValue: 40},
        {label: '100', color: COLOR_11, numericValue: 100},
        {label: '?', color: COLOR_12, numericValue: -1}
    ]
}

export const sequential = {
    id: 3,
    name: 'Sequentiell',
    values: [
        {label: '0', color: COLOR_1, numericValue: 0},
        {label: '1', color: COLOR_2, numericValue: 1},
        {label: '2', color: COLOR_3, numericValue: 2},
        {label: '3', color: COLOR_4, numericValue: 3},
        {label: '4', color: COLOR_5, numericValue: 4},
        {label: '5', color: COLOR_6, numericValue: 5},
        {label: '6', color: COLOR_7, numericValue: 6},
        {label: '7', color: COLOR_8, numericValue: 7},
        {label: '8', color: COLOR_9, numericValue: 8},
        {label: '9', color: COLOR_10, numericValue: 9},
        {label: '10', color: COLOR_11, numericValue: 10},
        {label: '?', color: COLOR_12, numericValue: -1}
    ]
}

export const tShirtVoteOptionId = 4;
export const tshirt = {
    id: tShirtVoteOptionId,
    name: 'T-Shirt',
    values: [
        {label: 'XS', color: COLOR_3, numericValue: 1},
        {label: 'S', color: COLOR_4, numericValue: 2},
        {label: 'M', color: COLOR_6, numericValue: 3},
        {label: 'L', color: COLOR_8, numericValue: 4},
        {label: 'XL', color: COLOR_10, numericValue: 5},
        {label: 'XXL', color: COLOR_12, numericValue: 6},
        {label: '?', color: '#DAB785', numericValue: -1}
    ]
}

export const t42 = {
    id: 5,
    name: 'Team 42',
    values: [
        {label: '0', color: COLOR_1, numericValue: 0},
        {label: '0.25', color: COLOR_2, numericValue: 0.25},
        {label: '0.5', color: COLOR_3, numericValue: 0.5},
        {label: '1', color: COLOR_4, numericValue: 1},
        {label: '2', color: COLOR_5, numericValue: 2},
        {label: '3', color: COLOR_6, numericValue: 3},
        {label: '5', color: COLOR_7, numericValue: 5},
        {label: '8', color: COLOR_8, numericValue: 8},
        {label: '13', color: COLOR_9, numericValue: 13},
        {label: '21', color: COLOR_10, numericValue: 21},
        {label: '34', color: COLOR_11, numericValue: 34},
        {label: '?', color: COLOR_12, numericValue: -1}
    ]
}

export const VALUE_TYPE_OPTIONS = [
    scrum, fibonacci, sequential, tshirt, t42
];

export const VOTING_STATE = {
    VOTING: 1,
    REVEALED: 2,
    CLOSED: 3
}

export const ESTIMATION_TIMER_STATE = {
    RUNNING: 1,
    STOPPED: 0,
}

export const LANG_COOKIE_KEY = 'estimation-poker-lang';