import {VueCookieNext} from "vue-cookie-next";
import {LANG_COOKIE_KEY, PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";


export function getCookie(cookieKey: string): any {
    return VueCookieNext.getCookie(cookieKey);
}

export function setCookie(cookieKey: string, cookieValue: string): void {
    const privacyConfirmed = VueCookieNext.getCookie(PRIVACY_POLICY_COOKIE_KEY);
    if (privacyConfirmed) {
        VueCookieNext.setCookie(cookieKey, cookieValue, {
            path: '/',
            domain: 'localhost',
            secure: 'true',
            sameSite: 'true',
            expire: '365d'
        })
    }
}

export function refreshRoomCookie(roomId: string) {
    const token = getCookie(roomId);
    setCookie(roomId, token);
}

export function setPrivacyCookie(cookieKey: string, cookieValue: string): void {
    VueCookieNext.setCookie(cookieKey, cookieValue)
}

export function removeCookie(cookieKey: string): void {
    VueCookieNext.removeCookie(cookieKey)
}

export function removeAllCookies(): void {
    const keys = [...VueCookieNext.keys()];
    keys.forEach(cookieKey => VueCookieNext.removeCookie(cookieKey));
}

export function getRoomAuthenticationsFromCookies(): any[] {
    return VueCookieNext.keys().filter(key => ![PRIVACY_POLICY_COOKIE_KEY, LANG_COOKIE_KEY].includes(key)).map(roomId => {
        const jwt = getCookie(roomId);
        return {roomId, token: jwt};
    });
}