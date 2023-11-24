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


    public processPlaylistCommand(roomId: string, playlistCmd: PlaylistCommand) {
        const room = this.getRoom(roomId);
        return playlistService.executePlaylistCommand(room, playlistCmd);
    }

    public processDisconnectClient(roomId: string, userId: string) {
        const room = this.getRoom(roomId);
        if (room) {
            const removedUser = room.removeUser(userId);
            if (removedUser) {
                room.removeUserConnection(removedUser.id);
                logger.info(LEFT_ROOM, removedUser.getId(), room.getId());
                room.removeUserFromVoiceChatPeers(userId);
                this.removeDrawnLinesIfNeeded(room, removedUser);
                if (room.isEmpty()) {
                    this.processRoomIsEmptyAfterDisconnect(room);
                } else {
                    websocketService.notifyUsersAboutUserDisconnect(room.getUserList(), roomId);
                }
            }
        }
    }

    public enforceRoomCleanUpForRoom(room: Room) {
        this.processRoomIsEmptyAfterDisconnect(room);
    }

    private removeDrawnLinesIfNeeded(room: Room, removedUser: User) {
        if (!removedUser.getAuthorization().hasEntitlement(Entitlement.HOST)) {
            room.clearDrawnLinesFromUser(removedUser.getId());
        }
    }

    private processRoomIsEmptyAfterDisconnect(room: Room) {
        if (room.getVideoPlayerSettings().getState() == PLAYING) {
            room.getVideoPlayerSettings().setState(PAUSED);
        }

        const cleanupTimeout = setTimeout(function () {
            try {
                roomRepository.removeRoom(room.getId());
                userService.removeRoomAuthorizations(room.getId());
            } catch (e) {
                logger.error(e);
            }
        }, ROOM_CLEANUP_TIMEOUT)
        room.setCleanUpTimeout(cleanupTimeout);
        logger.log('armed cleanup timeout - room: ' + room.getId());
    }

    public toggleRoomHostedState(roomId: string, from: string) {
        const room = this.getRoom(roomId);
        if (room) {
            const roomIsHosted = userService.toggleRoomHostedState(roomId);
            if (roomIsHosted) {
                AppServiceUtil.clearAllDrawnLinesFromUsersWithoutDrawEntitlement(room);
                AppServiceUtil.clearAllUsersFromVoiceChatWithoutVoiceChatEntitlement(room);
            }
            const toggleRoomHostedResponse = new ToggleRoomHostedResponse(from, PURPOSE_HOSTED_ROOM_TOGGLE, roomIsHosted, room.voiceChatPeers);
            websocketService.notifyAllUsersInRoom(roomId, toggleRoomHostedResponse);
        }
    }

    public getInitialRoomData(roomId: string): InitialRoomData {
        return AppServiceUtil.createInitialRoomData(this.getRoom(roomId));
    }

    public getInitialUserList(roomId: string): User[] {
        return this.getRoom(roomId).getUserList();
    }

    public getInitialVideoPlayerAction(roomId: string): VideoPlayerAction {
        return AppServiceUtil.getVideoPlayerAction(this.getRoom(roomId));
    }

    public getNextVideo(roomId: string): Video {
        return this.getRoom(roomId).getNextVideo();
    }

    public getDrawnLines(roomId: string): Map<string, Line[]> {
        return this.getRoom(roomId).getDrawnLinesByUserId();
    }


    public processSyncRequest(roomId: string, videoPlayerAction: VideoPlayerAction) {
        const room = this.getRoom(roomId);
        playlistService.executeSyncRequestFromUser(room, videoPlayerAction);
    }


    public processChatmessage(roomId: string, chatMessage: ChatMessage) {
        const room = this.getRoom(roomId);
        const user = room.getUserById(chatMessage.getFrom());
        if (AppServiceUtil.isFlooding(user)) {
            const timestampForNextPossibleMessage = Util.getNowMillis() + CHAT_DISABLED_TIME;
            const floodingResponse = new ChatMessageResponse(chatMessage.getFrom(), PURPOSE_USER_FLOODING, null, timestampForNextPossibleMessage);
            websocketService.notifyUserById(room.getId(), user.getId(), floodingResponse);
        } else {
            chatMessage.setId(UUID());
            chatMessage.setCreatedAt(new Date());
            const chatMessageResponse = new ChatMessageResponse(chatMessage.getFrom(), PURPOSE_SEND_CHATMESSAGE, chatMessage, -1);
            websocketService.notifyAllUsersInRoom(roomId, chatMessageResponse);
        }
    }


    public changeUserName(roomId: string, from: string, updatedUser: User) {
        const room = this.getRoom(roomId);
        updatedUser = room.changeUserName(updatedUser);
        const userUpdateResponse = new UserUpdateResponse(from, PURPOSE_UPDATE_USERNAME, updatedUser);
        websocketService.notifyAllUsersInRoom(room.getId(), userUpdateResponse);
    }

    public changeUserIcon(roomId: string, from: string, userUpdate: User) {
        const room = this.getRoom(roomId);
        const user = room.getUserById(userUpdate.id);
        const userUpdateResponse = new UserUpdateResponse(from, PURPOSE_UPDATE_USERICON, user);
        websocketService.notifyAllUsersInRoom(room.getId(), userUpdateResponse);
    }


    public updateDrawingCanvasByUser(roomId: string, userId: string, lineId: string, updatedLine: Line, segment: Segment) {
        if (updatedLine) {
            this.updateDrawingCanvasLineByUser(roomId, userId, lineId, updatedLine);
        } else if (segment) {
            this.updateDrawingCanvasSegmentByUser(roomId, userId, lineId, segment);
        }
    }

    public updateDrawingCanvasLineByUser(roomId: string, userId: string, lineId: string, updatedLine: Line) {
        const room = this.getRoom(roomId);
        room.createLineByUserId(userId, updatedLine);
        const drawingUpdateResponse = new DrawingUpdateResponse(userId, PURPOSE_DRAWING_CANVAS_UPDATE, lineId, updatedLine);
        websocketService.notifyAllUsersInRoom(roomId, drawingUpdateResponse);
    }

    public updateDrawingCanvasSegmentByUser(roomId: string, userId: string, lineId: string, segment: Segment) {
        const room = this.getRoom(roomId);
        room.updateLineByUserId(userId, lineId, segment);
        const drawingUpdateResponse = DrawingUpdateResponse.of({
            from: userId,
            purpose: PURPOSE_DRAWING_CANVAS_UPDATE,
            lineId: lineId,
            segment: segment
        });
        websocketService.notifyAllUsersInRoom(roomId, drawingUpdateResponse);
    }

    public undoLatestDrawingUpdate(roomId: string, userId: string) {
        const room = this.getRoom(roomId);
        room.undoLatestDrawingUpdateByUser(userId);
        const drawingUpdateResponse = DrawingUpdateResponse.of({
            from: userId,
            purpose: PURPOSE_UNDO_USER_CANVAS_UPDATE
        });
        websocketService.notifyAllUsersInRoom(roomId, drawingUpdateResponse);
    }

    public deleteLinesDrawnByUser(roomId: string, userId: string) {
        const room = this.getRoom(roomId);
        room.clearDrawnLinesFromUser(userId);
        const drawingUpdateResponse = DrawingUpdateResponse.of({
            from: userId,
            purpose: PURPOSE_CLEAR_DRAWN_LINES_BY_USER
        });
        websocketService.notifyAllUsersInRoom(roomId, drawingUpdateResponse);
    }

    private getRoom(roomId: string): Room {
        return estimationPokerRoomRepository.getRoomById(roomId);
    }

    public processUpdateInitTimeOfCurrentVideo(roomId: string, updatedInitTime: number) {
        const room = this.getRoom(roomId);
        if (room.getVideoPlayerSettings().getVideo().getInitTime() == -1) {
            room.getVideoPlayerSettings().getVideo().setInitTime(updatedInitTime);
        }
    }

    public processPlaylistAutoPlayUpdate(roomId: string, userId: string, usePlaylist: boolean) {
        const room = this.getRoom(roomId);
        room.getVideoPlayerSettings().setAutoPlay(usePlaylist);
        const usePlaylistUpdateResponse = new PlaylistAutoPlayUpdateResponse(userId, PURPOSE_UPDATE_PLAYLIST_AUTO_PLAY, usePlaylist);
        websocketService.notifyAllUsersInRoom(roomId, usePlaylistUpdateResponse);
    }


    public onReceiveRequestingVoiceChatSignal(signal: string, targetPeerId: string, roomId: string, userId: string) {
        voiceChatSignalingService.handleSignalUpdate(signal, targetPeerId, this.getRoom(roomId), userId);
    }

    public onReceiveRequestingVoiceChatEnter(roomId: string, userId: string) {
        voiceChatSignalingService.handleVoiceChatEnter(this.getRoom(roomId), userId);
    }

    public onReceiveRequestingVoiceChatLeave(roomId: string, userId: string) {
        voiceChatSignalingService.handleVoiceChatLeave(this.getRoom(roomId), userId);
    }
}
