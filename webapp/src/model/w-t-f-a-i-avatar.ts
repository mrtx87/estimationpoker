import {AvatarElement} from "./avatar-element";

export class WTFAIAvatar {
    hair: AvatarElement;
    shirt: AvatarElement;
    head: AvatarElement;

    constructor(init: WTFAIAvatar) {
        this.hair = new AvatarElement(init.hair);
        this.shirt = new AvatarElement(init.shirt);
        this.head = new AvatarElement(init.head);
    }
}