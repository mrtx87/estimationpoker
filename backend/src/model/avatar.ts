import {AvatarElement} from "./avatar-element.model";

export class Avatar {
    hair: AvatarElement;
    shirt: AvatarElement;
    head: AvatarElement;

    constructor(init: Avatar) {
        this.hair = init.hair;
        this.shirt = init.shirt;
        this.head = init.head;
    }
}