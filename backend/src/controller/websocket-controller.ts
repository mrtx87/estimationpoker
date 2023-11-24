import {Entitlement} from "../enum/entitlements";
import {appService, userService} from "../server";
import {BasicRequest} from "../dto/request/basic-request";
import {PostAuthorization} from "../model/post-authorization";
import {VideoPlayerActionRequest} from "../dto/request/video-player-action-request";
import {InitTimeUpdateRequest} from "../dto/request/initial-time-update-request";
import {AuthorizationUpdate} from "../dto/request/authorization-update";
import {PlaylistAutoPlayUpdateRequest} from "../dto/request/playlist-autoplayer-update-request";
import {ChatMessageRequest} from "../dto/request/chat-message-request";
import {UserUpdateRequest} from "../dto/request/user-update-request";
import {DrawingUpdateRequest} from "../dto/request/drawing-update-request";
import {VoiceChatSignalRequest} from "../dto/request/voice-chat-signal-request";
import {PlaylistCommandRequest} from "../dto/request/playlist-command-request";

export class EndPointConfig {
    endpointId: string;
    requiredEntitlement: Entitlement;
    handleWebsocketRequest: Function;

    constructor(init: Partial<EndPointConfig>) {
        this.endpointId = init?.endpointId;
        this.requiredEntitlement = init?.requiredEntitlement;
        this.handleWebsocketRequest = init?.handleWebsocketRequest;
    }
}

export class WebsocketController {
    webSocketServer: any;
    joinEndPointConfig: EndPointConfig;

    constructor(webSocketServer: any) {
        this.webSocketServer = webSocketServer;
        this.applyControllerConfig();
        this.joinEndPointConfig = new EndPointConfig({
            endpointId: 'join-success',
            requiredEntitlement: null,
            handleWebsocketRequest: function (roomId: string, userId: string, connection: any) {
                appService.handleJoinSuccess(roomId, userId, connection);
            }
        });
    }

    endpointCallbacks: Map<string, EndPointConfig> = new Map();

    handleWebsocketMessage(dataWrapper: any, connection: any) {
        const path: string = dataWrapper.path;
        const roomId = this.parseRoomId(path);
        const endPointId = this.getEndpointId(path);
        if (endPointId === this.joinEndPointConfig.endpointId) {
            const requestData = <BasicRequest>dataWrapper.data;
            const postAuthorization = userService.authorize(roomId, requestData?.requesterSecret, this.joinEndPointConfig?.requiredEntitlement);
            if (postAuthorization.isAuthorized()) {
                this.joinEndPointConfig.handleWebsocketRequest(roomId, postAuthorization.authorization?.userId, connection);
            }
        } else if (this.hasEndPointMatch(endPointId)) {
            const endPointConfig = this.endpointCallbacks.get(endPointId);
            const requestData = <BasicRequest>dataWrapper.data;
            const postAuthorization = userService.authorize(roomId, requestData?.requesterSecret, endPointConfig?.requiredEntitlement);
            if (postAuthorization.isAuthorized()) {
                endPointConfig?.handleWebsocketRequest(postAuthorization, requestData);
            }
        } else {
            console.log('no matching endpoint found')
        }
    }

    private applyControllerConfig() {

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'heartbeat',
                requiredEntitlement: null,
                handleWebsocketRequest: () => {
                } // function(postAuth: PostAuthorization, request: any) { anyService.doSoemthing(postAuth.roomId, request.getContent())}
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'requesting-sync',
                requiredEntitlement: Entitlement.VIDEOPLAYER,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const videoPlayerActionRequest = VideoPlayerActionRequest.of(request);
                    videoPlayerActionRequest.videoPlayerAction.setFrom(postAuth.authorization.userId);
                    appService.processSyncRequest(postAuth.roomId, videoPlayerActionRequest.getVideoPlayerAction());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'update-init-time',
                requiredEntitlement: Entitlement.VIDEOPLAYER,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const initTimeUpdateRequest = InitTimeUpdateRequest.of(request);
                    appService.processUpdateInitTimeOfCurrentVideo(postAuth.roomId, initTimeUpdateRequest.getInitTime());
                }
            })
        );


        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'update-playlist-autoplay',
                requiredEntitlement: Entitlement.VIDEOPLAYER,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const playlistAutoPlayUpdateRequest = PlaylistAutoPlayUpdateRequest.of(request);
                    appService.processPlaylistAutoPlayUpdate(postAuth.roomId, postAuth.authorization.getUserId(), playlistAutoPlayUpdateRequest.isAutoPlay());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'update-entitlements',
                requiredEntitlement: Entitlement.VIDEOPLAYER,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const authorizationUpdate = AuthorizationUpdate.of(request);
                    userService.updateUserEntitlements(postAuth.authorization.userId, postAuth.roomId, authorizationUpdate.getAuthorization());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'toggle-room-hosted',
                requiredEntitlement: Entitlement.HOST,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    appService.toggleRoomHostedState(postAuth.roomId, postAuth.authorization.getUserId());
                }
            })
        );


        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'chatmessage',
                requiredEntitlement: Entitlement.CHAT,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const chatMessageRequest = ChatMessageRequest.of(request)
                    chatMessageRequest.chatMessage.setFrom(postAuth.authorization.userId);
                    appService.processChatmessage(postAuth.roomId, chatMessageRequest.getChatMessage());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'change-user-name',
                requiredEntitlement: null,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const userUpdateRequest = UserUpdateRequest.of(request);
                    appService.changeUserName(postAuth.roomId, postAuth.authorization.getUserId(), userUpdateRequest.getUser());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'change-user-icon',
                requiredEntitlement: null,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const userUpdateRequest = UserUpdateRequest.of(request);
                    appService.changeUserIcon(postAuth.roomId, postAuth.authorization.getUserId(), userUpdateRequest.getUser());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'delete-lines-drawn-by-user',
                requiredEntitlement: Entitlement.DRAW,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    appService.deleteLinesDrawnByUser(postAuth.roomId, postAuth.authorization.getUserId());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'undo-latest-drawing-update',
                requiredEntitlement: Entitlement.DRAW,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    appService.undoLatestDrawingUpdate(postAuth.roomId, postAuth.authorization.getUserId());
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'drawing-canvas-update',
                requiredEntitlement: Entitlement.DRAW,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const drawingUpdateRequest = DrawingUpdateRequest.of(request);
                    appService.updateDrawingCanvasByUser(
                        postAuth.roomId,
                        postAuth.authorization.getUserId(),
                        drawingUpdateRequest.getLineId(),
                        drawingUpdateRequest.getLine(),
                        drawingUpdateRequest.getSegment()
                    )
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'voice-chat-signal',
                requiredEntitlement: Entitlement.VOICECHAT,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const voiceChatSignalRequest = VoiceChatSignalRequest.of(request);
                    appService.onReceiveRequestingVoiceChatSignal(voiceChatSignalRequest.getSignal(), voiceChatSignalRequest.getTargetPeerId(), postAuth.roomId, postAuth.authorization.getUserId());

                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'voice-chat-enter',
                requiredEntitlement: Entitlement.VOICECHAT,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    appService.onReceiveRequestingVoiceChatEnter(postAuth.roomId, postAuth.authorization.userId);
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'voice-chat-leave',
                requiredEntitlement: Entitlement.VOICECHAT,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    appService.onReceiveRequestingVoiceChatLeave(postAuth.roomId, postAuth.authorization.userId);
                }
            })
        );

        this.addWebsocketEndPoint(
            new EndPointConfig({
                endpointId: 'playlist-command',
                requiredEntitlement: Entitlement.PLAYLIST,
                handleWebsocketRequest: function (postAuth: PostAuthorization, request: any) {
                    const playlistCommandRequest = PlaylistCommandRequest.of(request);
                    appService.processPlaylistCommand(postAuth.roomId, playlistCommandRequest.getPlaylistCommand())
                }
            })
        );
    }


    private addWebsocketEndPoint(endPointConfig: EndPointConfig) {
        this.endpointCallbacks.set(endPointConfig.endpointId, endPointConfig);
        return this;
    }

    private getEndpointId(path: string) {
        const lastIndexOfSlash = path.lastIndexOf('/');
        return path.substring(lastIndexOfSlash + 1);
    }

    private hasEndPointMatch(endsWith: string) {
        return this.endpointCallbacks.has(endsWith);
    }

    private parseRoomId(path: string) {
        const arr = path.match("roomId/(.*?)/");
        if (arr && arr.length > 1) {
            return arr[1];
        }
        return null;
    }
}

