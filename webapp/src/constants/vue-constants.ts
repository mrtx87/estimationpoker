export const RequestMessageType = {
    CREATE_GAME: 'create-room',
    JOIN_GAME: 'finalize-join',

}

export const ResponseMessageTypes = {
    JOINED_ESTIMATION_SESSION: 'finalized.join',
    ANOTHER_USER_JOINED_SESSION: 'another.user.joined',
    ROOM_NOT_EXISTING: 'room.not.existing',
    USER_DISCONNECTED: 'user.disconnected.room',
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
    JOIN_ROOM: 7,
    CREATE_ROOM: 8
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
    values: ['0', '0.5', '1', '2', '3', '5', '8', '13', '21', '34', '?']
}

export const VALUE_TYPE_OPTIONS = [
    scrum, fibonacci, sequential, tshirt, t42
]