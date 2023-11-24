import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";

export class Player {
    id: string | undefined;
    name: string | undefined;
    avatar: WTFAIAvatar | undefined;
    role: string | undefined;

    constructor(init: Partial<Player>) {
        this.id = init.id;
        this.avatar = init.avatar;
        this.name = init.name;
        this.role = init.role;
    }
}