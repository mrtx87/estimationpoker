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
    NOT_PERMITTED: 'user.not.permitted'
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
    values: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']
}

export const scrum = {
    id: 2,
    name: 'Scrum',
    values: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?']
}

export const sequential = {
    id: 3,
    name: 'Sequentiell',
    values: ['0', '1', '2', '3', '5', '6', '7', '8', '9', '10', '?']
}

export const tshirt = {
    id: 4,
    name: 'T-Shirt',
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?']
}

export const t42 = {
    id: 5,
    name: 'Team 42',
    values: ['0', '0.25', '0.5', '1', '2', '3', '5', '8', '13', '21', '34', '?']
}

export const t42_1 = {
    id: 5,
    name: 'Team 42',
    values: [{value: '0', color: '#3CA8F6'},
        {value: '0.25', color: '#29A0F5'},
        {value: '0.5', color: '#1597F4'},
        {value: '1', color: '#0B8DEA'},
        {value: '2', color: '#0A81D6'},
        {value: '3', color: '#0975C3'},
        {value: '5', color: '#086AAF'},
        {value: '8', color: '#075E9D'},
        {value: '13', color: '#065289'},
        {value: '21', color: '#054776'},
        {value: '34', color: '#04395E'},
        {value: '?', color: '#DAB785'}]
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