import {DBUser, User} from "../model/user";

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
import {UserMapper} from "../mapper/estimation-poker-mapper";
import {Avatar} from "../model/avatar";
import {DBUserModel} from "../db/mongodb/db-schemas";
import {AvatarElement} from "../model/avatar-element.model";

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
        const dbUserModel = new DBUserModel(DBUser.from({
            id: UUID(),
            roomId: roomId,
            name: userName,
            roles: roles,
            avatar: avatar ? avatar : default_avatar
        }));

        return dbUserModel.save().then(User.from)
    }

    getUser(userId: string) {
        return userRepository.getUser(userId).then(UserMapper.map);
    }

    getDBUsers(userIds: string[]) {
        return userRepository.getUsers(userIds).then(users => users.map(UserMapper.mapDBUser));
    }

    getDBUsersByRoomId(roomId: string) {
        return userRepository.getUsersByRoomId(roomId).then(users => users.map(UserMapper.mapDBUser));
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

    /**** these methods are currently not used

     onHandleRegister(req: any, res: any) {
        const rawToken = req.header('Authorization');
        const verified = this.verifyRegisterToken(rawToken);
        if (verified) {
            if (verified.email === req.body.email) {
                return this.onRegister(req, res);
            }
            return getBadRequestErrorResponseHandling(ERROR_REGISTER_EMAIL_NO_MATCH).toPromise();
        }
        return getBadRequestErrorResponseHandling(ERROR_REGISTER_LINK_NO_LONGER_VALID).toPromise();
    }


     private verifyRegisterToken(rawToken: string) {
        try {
            const token = rawToken.substring(7);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            return decoded;
        } catch (err) {
            logger.internalError(err.message);
            return null;
        }
    }


     onLogin(req: any) {
        return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, req).then(this.executeLogin.bind(this));
    }

     private async executeLogin(req: any) {
        try {
            const {username, password} = req.body;

            const foundLogin = await s9UserRepository.getLoginUser(username, username);

            let passwordMatch = false;
            if (foundLogin) {
                passwordMatch = await bcrypt.compare(password, 'TODO'); //foundLogin.password
            }
            if (!username || !password || !foundLogin || !passwordMatch) {
                return getUnauthorizedErrorResponseHandling(USER_NAME_OR_PW_NOT_EXISTS);
            }

            const loggedInUser = User.of(foundLogin);
            // TODO loggedInUser.token = this.getSignedJwtToken(foundLogin.id);
            return loggedInUser;
        } catch (err) {
            return getInternalErrorErrorResponseHandling(err, ERROR_WHILE_LOGIN_USER)
        }
    }

     findPublicUsers(searchText: string) {
        return s9UserRepository.findUsers(searchText).then(users => users.map(UserMapper.map));
    }


     async registerUserFromConfig(configUser: any) {
        try {
            const encryptedPassword = await bcrypt.hash(configUser.password, 10);

            const existingUser = await s9UserRepository.getLoginUser(configUser.name, configUser.email);
            const existingDeletedUser = await s9UserRepository.getDeletedUserByName(configUser.name);
            if (existingUser || existingDeletedUser) {
                logger.log(`[REGISTER USER FROM CONFIG] ${existingUser ? existingUser.name : existingDeletedUser?.name} exists -> not required to register.`)
                return;
            }

            const dbUserFromConfig: any = DBUser.from({...configUser}); //DBUser.of({...configUser, password: encryptedPassword});
            return s9UserRepository.createUser(dbUserFromConfig)
                .then(() => logger.log(`[REGISTER USER FROM CONFIG] user registered from config: ${dbUserFromConfig.name}`));
        } catch (e) {
            return logger.internalError(e);
        }
    }

     async registerTestUsers(testUsers: DBUser[]) {
        testUsers.forEach(testUser => {
            this.registerUserFromConfig(testUser);
        });
    }

     async onRegister(req: any, res?: any) {
        // Our register logic starts here
        try {
            const {username, email, password} = req.body;
            if (!password || !username || !email) {
                return getBadRequestErrorResponseHandling(REGISTER_INFO_INVALID).toPromise();
            }

            const existingUser = await s9UserRepository.getLoginUser(username, email);
            if (existingUser) {
                return getConflictingErrorResponseHandling(USER_ALREADY_EXISTS).toPromise();
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const imgUrl = '';

            const createdUser: any = {}; /* DBUser.of({
                id: UUID(),
                name: username,
                iconUrl: imgUrl,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
                role: ROLE.PARTICIPANT
            });

            return s9UserRepository.createUser(createdUser)
                .then(() => {
                    return User.of({...createdUser, token: this.getSignedJwtToken(createdUser.id)});
                });
        } catch (err) {
            return err;
        }
    }
     getUserByEmail(email: string) {
        return s9UserRepository.getUserByEmail(email);
    }

     async validateEditorIdAssignments(editorIds: string[]) {
        return s9UserRepository.getUsers(editorIds).then(foundUsers => {
            const invalidEditorsAssignments = editorIds.filter(editorId => !foundUsers.find(u => u.id === editorId));
            const validEditorsAssignments = foundUsers.map(u => u.id);
            return {invalidEditorsAssignments, validEditorsAssignments};
        });
    }
     */
}
