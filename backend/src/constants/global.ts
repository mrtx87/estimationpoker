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