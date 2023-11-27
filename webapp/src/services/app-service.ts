import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, PRIVACY_POLICY_COOKIE_KEY, ROOM_ROUTE} from "@/constants/vue-constants";
import {isValidRoomId} from "@/services/util";
import {router} from "@/main";
import {getCookie, setCookie} from "@/services/cookie-service";
import {WebsocketService} from "@/services/websocket-service";

export class AppService {
    routeOn: any = null;
    store: any;
    websocketService: WebsocketService = new WebsocketService();


    initApp() {
        if (!this.hasConfirmedPrivacyPolicy()) {
            this.store.setOverlayId(DISPLAY_OVERLAY_STATE.DSGVO);
            return
        }

        if (this.isOnRoomRoute()) {
            this.handleJoinRoom();
            return;
        }

        this.store.setOverlayId(DISPLAY_OVERLAY_STATE.HOME)
    }


    handleJoinRoom() {
        const roomId = this.getRouteParam('roomId');
        this.store.setRoomId(roomId);
        const token = getCookie(roomId);
        if (token) {
            this.websocketService.finalizeJoinRoom(roomId);
            return;
        }
        this.store.setOverlayId(DISPLAY_OVERLAY_STATE.JOIN_ROOM)
        return;    // JOIN
    }

    getRouteParam(name: string) {
        return this.routeOn.params[name];
    }

    setRouteOn(routeOn: any) {
        this.routeOn = routeOn;
    }

    setStore(store: any) {
        this.store = store;
    }

    setWebsocketService(webSocketService: WebsocketService) {
        this.websocketService = webSocketService;
    }

    hasConfirmedPrivacyPolicy() {
        return getCookie(PRIVACY_POLICY_COOKIE_KEY);
    }

    isOnRoomRoute() {
        const roomId = this.getRouteParam('roomId')
        return this.routeOn.path.startsWith(ROOM_ROUTE) && roomId && isValidRoomId(roomId);
    }

    onJoinRoomResponse(response: any) {
        this.processJoinResponse(response.data);
        this.initApp();
    }
    processJoinResponse(response: any) {
        this.setRoomCookie(response.roomId, response.token);
        router.push(ROOM_ROUTE + response.roomId);
    }
    setRoomCookie(roomId: string, token: string) {
        setCookie(roomId, token)
    }
}