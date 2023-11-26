export const RequestMessageType = {
    CREATE_GAME: 'create-room',
    JOIN_GAME: 'finalize-join',

}

export const ResponseMessageTypes = {
    JOINED_GAME_SESSION: 'finalized.join',
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
    JOIN_ROOM: 7,
}

export const APP_STATE = {
    NO_ROOM_ENTERED: 100,
    JOINING_ROOM: 101,
    ROOM_JOINED: 102
}


/** ROUTES **/

export const ROOM_ROUTE = '/estimations/room/'
export const HOME_ROUTE = '/'