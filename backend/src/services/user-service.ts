import {User} from "../model/user";

import {v4 as UUID} from 'uuid';
import {
    ERROR_REFESHING_TOKEN,
    ERROR_WHILE_USERS_REQUEST,
    INVALID_TOKEN,
    TOKEN_REQUIRED,
} from "../constants/error-texts";
import {default_avatar, ROLE} from "../constants/global";
import {
    getBadRequestErrorResponseHandling, getForbiddenErrorResponseHandling,
    getInternalErrorErrorResponseHandling,
    getUnauthorizedErrorResponseHandling,
} from "../util/util";
import {UserRepository} from "../repository/user-respository";
import {Avatar} from "../model/avatar";
import {UserModel} from "../db/mongodb/db-schemas";


const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRepository = UserRepository.s9UserRepository;

export class UserService {

    private static INSTANCE: UserService = new UserService();

    public static get userService(): UserService {
        return UserService.INSTANCE;
    }

    private constructor() {
    }

    authenticate(req: any) {
        const rawtoken = req.header('Authorization');
        if (!rawtoken) {
            return getForbiddenErrorResponseHandling(TOKEN_REQUIRED);
        }
        try {
            const token = rawtoken.substring(7);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = {...decoded, id: decoded.username};
        } catch (err) {
            return getUnauthorizedErrorResponseHandling(err.message, INVALID_TOKEN);
        }
        return true;
    };

    authenticateToken(token: string) {
        if (!token) {
            return null;
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            return {...decoded, userId: decoded.username};
        } catch (err) {
            return null;
        }
    }


    refreshToken(req: any, res?: any) {
        try {
            const userId = req.user.id;
            return Promise.resolve(this.getSignedJwtToken(userId, 'TODO'));
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e.message, ERROR_REFESHING_TOKEN).toPromise();
        }
    }

    createUser(userName: string, avatar: Avatar, roomId: string, roles = [ROLE.PARTICIPANT]) {
        const dbUserModel = new UserModel(User.of({
            id: UUID(),
            roomId: roomId,
            name: userName,
            roles: roles,
            avatar: avatar ? avatar : default_avatar
        }));

        return dbUserModel.save().then(User.of)
    }
    updateUser(userUpdate: User) {
       return userRepository.updateUser(userUpdate).then(User.of);
    }


    getUser(userId: string) {
        return userRepository.getUser(userId).then(User.of);
    }

    getUsers(userIds: string[]) {
        return userRepository.getUsers(userIds).then(users => users.map(User.of));
    }

    getUsersByRoomId(roomId: string) {
        return userRepository.getUsersByRoomId(roomId).then(users => users.map(User.of));
    }

    deleteUsers(roomId: string) {
        userRepository.deleteUsers(roomId);
    }

    deleteUser(userId: string) {
        return userRepository.getUser(userId).then(user => {
            if(user) {
                user.delete();
                return true;
            }
            return false;
        });
    }

    isModerator(userId: string) {
        return userRepository.getUser(userId).then(user => Promise.resolve(user?.roles.includes(ROLE.MODERATOR)));
    }

    isAdmin(userId: string) {
        return userRepository.getUser(userId).then(user => Promise.resolve(user?.roles.includes('admin')));
    }

    updateUserAvatar(userId: string, avatar: Avatar): PromiseLike<any> {
        return userRepository.getUser(userId)
            .then((foundUser: any) => {
                if (!foundUser) {
                    return getBadRequestErrorResponseHandling(ERROR_WHILE_USERS_REQUEST).toPromise();
                }

                foundUser.avatar = avatar;
                return foundUser.save().then(() => foundUser.iconUrl);
            });
    }


    public getSignedJwtToken(userId: string, roomId: string) {
        return jwt.sign({username: userId, roomId: roomId}, process.env.JWT_KEY, {
            algorithm: "HS256"
        });
    }
}
