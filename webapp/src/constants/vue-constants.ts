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
    CHANGE_USERNAME: 'change-username',
    CHANGE_AVATAR: 'change-avatar',
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
    AVATAR_CHANGED: 'user.avatar.changed',
    UPDATED_ROOM_SETTINGS: 'room.settings.updated',
    CHANGED_USER_NAME: 'user.updated',
    CHANGED_USER_ROLE: 'user.role.updated',
    USER_VOTED: 'user.voted',
    NOT_PERMITTED: 'user.not.permitted',
    ERROR_REVEALING_VOTES: 'error.revealing.votes'
}

export const MenuItemKey = {
    CREATE_NEW_GAME: 'create-new-game',
    BACK_TO_HOME: 'back-to-home'
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
    JOIN_ROOM: 7,
    CREATE_ROOM: 8,
    ROOM_SETTINGS: 9
}

export const APP_STATE = {
    NO_ROOM_ENTERED: 100,
    CREATING_ROOM: 101,
    JOINING_ROOM: 105,
    ROOM_JOINED: 1010
}


/** ROUTES **/

export const ROOM_ROUTE = '/estimations/room/';
export const HOME_ROUTE = '/';

/** VALUE TYPES **/

export const fibonacci = {
    id: 1,
    name: 'Fibonacci',
    values: [
        {value: '0', color: '#3CA8F6', numericValue: 0},
        {value: '1', color: '#29A0F5', numericValue: 1},
        {value: '2', color: '#1597F4', numericValue: 2},
        {value: '3', color: '#0B8DEA', numericValue: 3},
        {value: '5', color: '#0A81D6', numericValue: 5},
        {value: '8', color: '#0975C3', numericValue: 8},
        {value: '13', color: '#086AAF', numericValue: 13},
        {value: '21', color: '#075E9D', numericValue: 21},
        {value: '34', color: '#065289', numericValue: 34},
        {value: '55', color: '#054776', numericValue: 55},
        {value: '89', color: '#04395E', numericValue: 89},
        {value: '?', color: '#DAB785', numericValue: -1}
    ]
}

export const scrum = {
    id: 2,
    name: 'Scrum',
    values: [
        {value: '0', color: '#3CA8F6', numericValue: 0},
        {value: '0.5', color: '#29A0F5', numericValue: 0.5},
        {value: '1', color: '#1597F4', numericValue: 1},
        {value: '2', color: '#0B8DEA', numericValue: 2},
        {value: '3', color: '#0A81D6', numericValue: 3},
        {value: '5', color: '#0975C3', numericValue: 5},
        {value: '8', color: '#086AAF', numericValue: 8},
        {value: '13', color: '#075E9D', numericValue: 13},
        {value: '20', color: '#065289', numericValue: 20},
        {value: '40', color: '#054776', numericValue: 40},
        {value: '100', color: '#04395E', numericValue: 100},
        {value: '?', color: '#DAB785', numericValue: -1}
    ]
}

export const sequential = {
    id: 3,
    name: 'Sequentiell',
    values: [
        {value: '0', color: '#3CA8F6', numericValue: 0},
        {value: '1', color: '#29A0F5', numericValue: 1},
        {value: '2', color: '#1597F4', numericValue: 2},
        {value: '3', color: '#0B8DEA', numericValue: 3},
        {value: '4', color: '#0A81D6', numericValue: 4},
        {value: '5', color: '#0975C3', numericValue: 5},
        {value: '6', color: '#086AAF', numericValue: 6},
        {value: '7', color: '#075E9D', numericValue: 7},
        {value: '8', color: '#065289', numericValue: 8},
        {value: '9', color: '#054776', numericValue: 9},
        {value: '10', color: '#04395E', numericValue: 10},
        {value: '?', color: '#DAB785', numericValue: -1}
    ]
}

export const tshirt = {
    id: 4,
    name: 'T-Shirt',
    values: [
        {value: 'XS', color: '#3CA8F6', numericValue: 1},
        {value: 'S', color: '#1597F4', numericValue: 2},
        {value: 'M', color: '#0A81D6', numericValue: 3},
        {value: 'L', color: '#086AAF', numericValue: 4},
        {value: 'XL', color: '#065289', numericValue: 5},
        {value: 'XXL', color: '#04395E', numericValue: 6},
        {value: '?', color: '#DAB785', numericValue: -1}
    ]
}

export const t42 = {
    id: 5,
    name: 'Team 42',
    values: [
        {value: '0', color: '#3CA8F6', numericValue: 0},
        {value: '0.25', color: '#29A0F5', numericValue: 0.25},
        {value: '0.5', color: '#1597F4', numericValue: 0.5},
        {value: '1', color: '#0B8DEA', numericValue: 1},
        {value: '2', color: '#0A81D6', numericValue: 2},
        {value: '3', color: '#0975C3', numericValue: 3},
        {value: '5', color: '#086AAF', numericValue: 5},
        {value: '8', color: '#075E9D', numericValue: 8},
        {value: '13', color: '#065289', numericValue: 13},
        {value: '21', color: '#054776', numericValue: 21},
        {value: '34', color: '#04395E', numericValue: 34},
        {value: '?', color: '#DAB785', numericValue: -1}
    ]
}

export const chart_colors = [
    '#3CA8F6',
    '#1597F4',
    '#0A81D6',
    '#086AAF',
    '#065289',
    '#04395E',
    '#DAB785']

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
