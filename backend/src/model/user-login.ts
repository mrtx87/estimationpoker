import {Authorization} from "./authorization";


export class UserLogin {
    name: string;
    password: string;

    static from(name: string, password: string) {
        const userLogin = new UserLogin();
        userLogin.name = name;
        userLogin.password = password;

        return userLogin;
    }
}
