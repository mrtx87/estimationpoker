import {Avatar} from "../model/avatar";
import {AvatarElement} from "../model/avatar-element.model";

export const SYSTEM_USER_ID = 'system';

export const ROLE = {
    MODERATOR: 'moderator',
    PARTICIPANT: 'participant',
    SPECTATOR: 'spectator'
};

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
    ACTION_UNKNOWN: 'action.unknown',
    UNKNOWN_USER: 'user.unknown',
    REMOVED_FROM_ROOM: 'user.removed.from.room',
    UPDATED_ROOM_SETTINGS: 'room.settings.updated',
    CHANGED_USER_NAME: 'user.updated',
    CHANGED_USER_ROLE: 'user.role.updated',
    USER_VOTED: 'user.voted',
    NOT_PERMITTED: 'user.not.permitted'
}


/***** Card Values Config *****/


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

export const default_avatar = new Avatar({
    hair: new AvatarElement({
        type: 'hair',
        color: '#CBA670',
        code: 1
    }),
    head: new AvatarElement({
        type: 'head',
        color: '#FF861C',
        code: 1
    }),
    shirt: new AvatarElement({
        type: 'shirt',
        color: '#9A3EE9',
        code: 1
    })
});

export const VOTING_STATE = {
    VOTING: 1,
    REVEALED: 2,
    CLOSED: 3
}

export const ESTIMATION_TIMER_STATE = {
    RUNNING: 1,
    STOPPED: 0,
}