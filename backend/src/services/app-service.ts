import {Room} from "../model/room";
import {UserAuthentication} from "../model/user-authentication";
import {EnterRoomResponse} from "../dto/response/enter-room-response";
import {
    iconService,
    playlistService,
    estimationPokerRoomRepository,
    userService,
    voiceChatSignalingService,
    websocketService
} from "../server";
import {RoomUtil} from "../util/room-util";
import {UserServiceUtil} from "../util/user-service-util";
import {v4 as UUID} from 'uuid';
import {CREATED_ROOM, JOINED_ROOM, LEFT_ROOM} from "../logging/logging-texts";
import {
    CHAT_DISABLED_TIME,
    PAUSED,
    PLAYING,
    PURPOSE_CLEAR_DRAWN_LINES_BY_USER,
    PURPOSE_DRAWING_CANVAS_UPDATE,
    PURPOSE_HOSTED_ROOM_TOGGLE,
    PURPOSE_SEND_CHATMESSAGE,
    PURPOSE_UNDO_USER_CANVAS_UPDATE,
    PURPOSE_UPDATE_PLAYLIST_AUTO_PLAY,
    PURPOSE_UPDATE_USERICON,
    PURPOSE_UPDATE_USERNAME,
    PURPOSE_USER_FLOODING,
    ROOM_CLEANUP_TIMEOUT
} from "../constants/constants";
import {ResponseCode} from "../controller-config/rest-controller-configurator";
import {InitialRoomData} from "../model/initial-room-data";
import {AppServiceUtil} from "../util/app-service-util";
import {VideoPlayerAction} from "../model/video-player-action";
import {Video} from "../model/video";
import {Line} from "../model/line";
import {PlaylistAutoPlayUpdateResponse} from "../dto/response/playlist-auto-play-update-response";
import {ToggleRoomHostedResponse} from "../dto/response/toggle-room-hosted-response";
import {Util} from "../util/util";
import {ChatMessage} from "../model/chat-message";
import {ChatMessageResponse} from "../dto/response/chat-message-response";
import {User} from "../model/user";
import {UserUpdateResponse} from "../dto/response/user-update-response";
import {DrawingUpdateResponse} from "../dto/response/drawing-update-response";
import {Segment} from "../model/segment";
import {PlaylistCommand} from "../model/playlist-command";
import {Entitlement} from "../enum/entitlements";
import {logger} from "./curview-logger";

export class AppService {
    private static INSTANCE: AppService = new AppService();

    public static get appService(): AppService {
        return AppService.INSTANCE;
    }

    private constructor() {
    }

    static startedAt: number = 0;

    public createRoom(userAuthentication: UserAuthentication): EnterRoomResponse {
        const room = Room.CREATE();
        //estimationPokerRoomRepository.addRoom(room);
        userService.addNewRoomUserAuthorizations(room.getId(), false);
        logger.info(CREATED_ROOM + room.getId());
        const ownerAuthorization = UserServiceUtil.createHostAuthorization(UUID());
        userService.updateUserAuthorizationInRoom(room.getId(), userAuthentication.getSecret(), ownerAuthorization);
        const roomHost = UserServiceUtil.createUser(ownerAuthorization, userAuthentication);
        roomHost.authorization = ownerAuthorization;
        room.addUser(roomHost);

        return RoomUtil.createEnterRoomResponse(room.getId(), roomHost, userAuthentication.secret);
    }

    public joinRoomAsNewUser(roomId: string): Promise<EnterRoomResponse | ResponseCode> {
        return userService.createNewUserAuthentication()
            .then(userAuthentication => this.joinRoom(roomId, userAuthentication))
    }

    public joinRoom(roomId: string, userAuthentication: UserAuthentication): EnterRoomResponse | ResponseCode {
        let authorization = userService.getUserAuthorization(roomId, userAuthentication.getSecret());
        if (!authorization) {
            authorization = UserServiceUtil.createGuestAuthorization(UUID());
            userService.updateUserAuthorizationInRoom(roomId, userAuthentication.getSecret(), authorization);
        }

        const joiningUser = UserServiceUtil.createUser(authorization, userAuthentication);
        const room = this.getRoom(roomId);
        room.addUser(joiningUser);
        logger.info(JOINED_ROOM, joiningUser.getId(), room.getId());

        const joinRoomResponse = RoomUtil.createJoinRoomResponse(roomId, joiningUser, room.getUserList(), room.getVoiceChatPeers());
        websocketService.sendJoinRoomNotification(roomId, room.getUserIds(), joinRoomResponse);

        joinRoomResponse.setSecret(userAuthentication.getSecret());
        joinRoomResponse.setHostedRoom(userService.isHostedRoom(roomId));
        return joinRoomResponse;
    }

    public handleJoinSuccess(roomId: string, userId: string, connection: any) {
        const room = this.getRoom(roomId);
        if (room) {
            room.defuseCleanupTimeout();
            room.getUserConnections().set(userId, connection)
            connection['roomId'] = room.getId();
            connection['userId'] = userId;
        }
    }



    public processDisconnectClient(roomId: string, userId: string) {
        const room = estimationPokerRoomRepository.getDocumentById(roomId);
        if (room) {
            const removedUser = room.removeUser(userId);
            if (removedUser) {
                room.removeUserConnection(removedUser.id);
                logger.info(LEFT_ROOM, removedUser.getId(), room.getId());
                room.removeUserFromVoiceChatPeers(userId);
                if (room.isEmpty()) {
                    this.processRoomIsEmptyAfterDisconnect(room);
                } else {
                    websocketService.notifyUsersAboutUserDisconnect(room.getUserList(), roomId);
                }
            }
        }
    }

}
