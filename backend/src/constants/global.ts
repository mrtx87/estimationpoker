import {Avatar} from "../model/avatar";
import {AvatarElement} from "../model/avatar-element.model";

export const ROLE = {
    MODERATOR: 'moderator',
    PARTICIPANT: 'participant',
    SPECTATOR: 'spectator'
};

export const RequestMessageType = {
    FINALIZE_JOIN: 'finalize-join',
    JOIN_GAME: 'join-session',
    PING: 'ping'
}

export const ResponseMessageType = {
    JOINED_ESTIMATION_SESSION: 'finalized.join',
    ANOTHER_USER_JOINED_SESSION: 'another.user.joined',
    ROOM_NOT_EXISTING: 'room.not.existing',
    USER_DISCONNECTED: 'user.disconnected.room',
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