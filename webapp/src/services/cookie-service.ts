import {VueCookieNext} from "vue-cookie-next";
import {PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";


export function getCookie(cookieKey: string): any {
    return VueCookieNext.getCookie(cookieKey);
}

export function setCookie(cookieKey: string, cookieValue: string): void {
    const privacyConfirmed = VueCookieNext.getCookie(PRIVACY_POLICY_COOKIE_KEY);
    if(privacyConfirmed || 1 == 1) {
        VueCookieNext.setCookie(cookieKey, cookieValue, {
            path: '/',
            domain: 'localhost',
            secure: 'true',
            sameSite: 'true'
        })
    }
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

