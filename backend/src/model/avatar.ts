import {AvatarElement} from "./avatar-element.model";

export class Avatar {
    hair: AvatarElement;
    shirt: AvatarElement;
    head: AvatarElement;

    constructor(init: Avatar) {
        this.hair = new AvatarElement(init.hair);
        this.shirt = new AvatarElement(init.shirt);
        this.head = new AvatarElement(init.head);
    }
}