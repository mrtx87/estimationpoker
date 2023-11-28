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
        user.avatar = init.avatar;
        return user;
    }

    static from(init: DBUser) {
        const user = new User();
        user.id = init.id;
        user.roomId = init.roomId;
        user.name = init.name;
        user.roles = init.roles;
        user.avatar = init.avatar;
        return user;
    }
}

export class DBUser {
    id: string;
    roomId: string
    name: string;
    roles: string[];
    avatar: Avatar;

    static from(init: Partial<User>) {
        const dbUser = new DBUser();
        dbUser.id = init.id;
        dbUser.roomId = init.roomId;
        dbUser.name = init.name;
        dbUser.roles = init.roles;
        dbUser.avatar = init.avatar;
        return dbUser;
    }

}
