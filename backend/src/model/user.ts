export class PublicUser {
    id: string;
    name: string;
    iconUrl: string;
    inactive: boolean;

    static publicUser(init: any) {
        const user = new PublicUser();
        user.id = init.id;
        user.name = init.name;
        user.iconUrl = init.iconUrl;
        user.inactive = Boolean(!init.email);
        return user;
    }
}

export class User extends PublicUser{
    token: string;
    email: string;
    role: string;

    static of(init: any) {
        const user = new User();
        user.id = init.id;
        user.name = init.name;
        user.iconUrl = init.iconUrl;
        user.email = init.email;
        user.token = init.token;
        user.role = init.role;
        return user;
    }
}

export class Account {
    id: string;
    name: string;
    iconUrl: string;
    email: string;
    password: string;
    role: string;

    static of(init: any) {
        const user = new Account();
        user.name = init.name;
        user.iconUrl = init.iconUrl;
        user.email = init.email;
        user.password = init.password;
        user.id = init.id;
        user.role = init.role;
        return user;
    }
}

export class DeletedUser {
    id: string;
    name: string;
    iconUrl: string;
    inactive: boolean;

    static of(init: any) {
        const user = new DeletedUser();
        user.name = init.name;
        user.iconUrl = init.iconUrl;
        user.id = init.id;
        user.inactive = true;
        return user;
    }


}

export class DeletedDBUser {
    id: string;
    name: string;
    iconUrl: string;

    static of(init: any) {
        const user = new DeletedDBUser();
        user.name = init.name;
        user.iconUrl = init.iconUrl;
        user.id = init.id;
        return user;
    }
}
