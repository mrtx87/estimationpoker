import {WTFAIAvatar} from "./w-t-f-a-i-avatar";

export class GlobalPlayerCookie {
    name: string;
    avatar: WTFAIAvatar
    bgSoundMuted: boolean;


    constructor(init: GlobalPlayerCookie) {
        this.name = init.name;
        this.avatar = new WTFAIAvatar(init.avatar);
        this.bgSoundMuted = init.bgSoundMuted;
    }
}