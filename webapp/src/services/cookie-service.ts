import {VueCookieNext} from "vue-cookie-next";
import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";
import {PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";


export function getCookie(cookieKey: string): any {
    return VueCookieNext.getCookie(cookieKey);
}

export function setCookie(cookieKey: string, cookieValue: string): void {
    const privacyConfirmed = VueCookieNext.getCookie(PRIVACY_POLICY_COOKIE_KEY);
    if(privacyConfirmed) {
        VueCookieNext.setCookie(cookieKey, cookieValue)
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

export function getRandomAvatar(headsOptionsLength: number,
                                hairOptionsLength: number,
                                shirtOptionsLength: number,
                                colorOptions: string[]): WTFAIAvatar {
    const randomHead = randomInt(headsOptionsLength) + 1;
    const randomHair = randomInt(hairOptionsLength) + 1;
    const randomShirt = randomInt(shirtOptionsLength) + 1;
    const avatar = new WTFAIAvatar({
        head: {type: 'face', code: randomHead, color: randomColor(colorOptions)},
        hair: {type: 'hair', code: randomHair, color: randomColor(colorOptions)},
        shirt: {type: 'shirt', code: randomShirt, color: randomColor(colorOptions)},
    });
    return avatar;
}

export function randomInt(num: number) {
    return Math.floor(Math.random() * num);
}

export function randomSelection(arr: any[]) {
    return arr[randomInt(arr.length)];
}

function randomColor(colorOptions: string[]): string {
    return randomSelection(colorOptions);
}
