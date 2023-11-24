export class AvatarElement {
    type: string;
    code: number;
    color: string;

    constructor(init: AvatarElement) {
        this.type = init.type;
        this.code = init.code;
        this.color = init.color;
    }
}