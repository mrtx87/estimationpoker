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
        const avatarList = init.avatar.split('|');
        const hair = avatarList[0].split('$');
        const head = avatarList[1].split('$');
        const shirt = avatarList[2].split('$');
        user.avatar = new Avatar({
            hair: {type: hair[0], color: hair[1], code: +hair[2]},
            head: {type: head[0], color: head[1], code: +head[2]},
            shirt: {type: shirt[0], color: shirt[1], code: +shirt[2]},
        });
        return user;
    }
}

export class DBUser {
    id: string;
    roomId: string
    name: string;
    roles: string[];
    avatar: string;

    static from(init: Partial<User>) {
        const dbUser = new DBUser();
        dbUser.id = init.id;
        dbUser.roomId = init.roomId;
        dbUser.name = init.name;
        dbUser.roles = init.roles;
        dbUser.avatar = `${init.avatar.hair.type + '$' + init.avatar.hair.color + '$' + init.avatar.hair.code}|${init.avatar.head.type + '$' + init.avatar.head.color + '$' + init.avatar.head.code}|${init.avatar.shirt.type + '$' + init.avatar.shirt.color + '$' + init.avatar.shirt.code}`;
        return dbUser;
    }

}
