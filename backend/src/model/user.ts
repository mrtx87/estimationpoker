import {Avatar} from "./avatar";

export class User {
    id: string;
    roomId: string;
    name: string;
    roles: string[];
    avatar: Avatar

    static of(init: any) {
        const user = new User();
        user.id = init.id;
        user.roomId = init.roomId;
        user.name = init.name;
        user.roles = init.roles;
        user.avatar = new Avatar(init.avatar);
        return user;
    }
}

