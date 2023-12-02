import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, PRIVACY_POLICY_COOKIE_KEY, ROOM_ROUTE} from "@/constants/vue-constants";
import {isValidRoomId, Logger, randomColor, randomInt} from "@/services/util";
import {router} from "@/main";
import {getCookie, setCookie} from "@/services/cookie-service";
import {WebsocketService} from "@/services/websocket-service";
import * as avatars from "@/assets/avatar/avatar-constants";
import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";

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
            this.store.reset();
            this.handleJoinRoom();
            return;
        }

        this.store.reset();
        this.websocketService.wsConnection?.close();
        this.store.setOverlayId(DISPLAY_OVERLAY_STATE.CREATE_ROOM);
    }


    handleJoinRoom() {
        const roomId = this.getRouteParam('roomId');
        this.store.setRoomId(roomId);
        const token = getCookie(roomId);
        if (token) {
            this.websocketService.sendFinalizeJoinRoom(roomId);
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
        this.processInitialJoinResponse(response.data);
        this.initApp();
    }

    processInitialJoinResponse(response: any) {
        this.setRoomCookie(response.roomId, response.token);
        router.push(ROOM_ROUTE + response.roomId);
    }

    setRoomCookie(roomId: string, token: string) {
        setCookie(roomId, token)
    }

    getRandomAvatar(): WTFAIAvatar {
        const hairOptions = [...avatars.avatarHairsOptions];
        const headsOptions = [...avatars.avatarHeadsOptions];
        const shirtOptions = [...avatars.avatarShirtsOptions];
        const colorOptions = [...avatars.colorOptions];

        const randomHead = randomInt(headsOptions.length) + 1;
        const randomHair = randomInt(hairOptions.length) + 1;
        const randomShirt = randomInt(shirtOptions.length) + 1;
        const avatar = new WTFAIAvatar({
            head: {type: 'face', code: randomHead, color: randomColor(colorOptions)},
            hair: {type: 'hair', code: randomHair, color: randomColor(colorOptions)},
            shirt: {type: 'shirt', code: randomShirt, color: randomColor(colorOptions)},
        });
        return avatar;
    }
}