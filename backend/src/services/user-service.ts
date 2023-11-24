import {DBUser, DeletedDBUser, User} from "../model/user";

import {logger} from "./s9logger";
import {v4 as UUID} from 'uuid';
import {
    ERROR_REFESHING_TOKEN, ERROR_REGISTER_EMAIL_NO_MATCH, ERROR_REGISTER_LINK_NO_LONGER_VALID,
    ERROR_WHILE_USERS_REQUEST,
    INVALID_TOKEN,
    REGISTER_INFO_INVALID,
    TOKEN_REQUIRED,
    USER_ALREADY_EXISTS,
    USER_NAME_OR_PW_NOT_EXISTS,
    USER_TO_DELETE_NOT_EXISTS
} from "../constants/error-texts";
import {ROLE} from "../constants/global";
import {
    getBadRequestErrorResponseHandling, getConflictingErrorResponseHandling, getForbiddenErrorResponseHandling,
    getInternalErrorErrorResponseHandling,
    getUnauthorizedErrorResponseHandling, wait, WAIT_DELAY_FOR_EXPENSIVE_REQUESTS
} from "../util/util";
import {S9UserRepository} from "../repository/user-respository";
import {S9UserMapper} from "../mapper/s9-mapper";
import {S9DeletedUserModel} from "../db/mongodb/db-schemas";

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const s9UserRepository = S9UserRepository.s9UserRepository;


export class UserService {

    private static INSTANCE: UserService = new UserService();

    public static get userService(): UserService {
        return UserService.INSTANCE;
    }

    private constructor() {
    }

    async registerUserFromConfig(configUser: DBUser) {
        try {
            const encryptedPassword = await bcrypt.hash(configUser.password, 10);

            const existingUser = await s9UserRepository.getLoginUser(configUser.name, configUser.email);
            const existingDeletedUser = await s9UserRepository.getDeletedUserByName(configUser.name);
            if (existingUser || existingDeletedUser) {
                logger.log(`[REGISTER USER FROM CONFIG] ${existingUser ? existingUser.name : existingDeletedUser?.name} exists -> not required to register.`)
                return;
            }

            const dbUserFromConfig = DBUser.of({...configUser, password: encryptedPassword});
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

            const createdUser = DBUser.of({
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

    onLogin(req: any) {
        return wait(WAIT_DELAY_FOR_EXPENSIVE_REQUESTS, req).then(this.executeLogin.bind(this));
    }

    authenticate(req: any, res?: any) {
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

    refreshToken(req: any, res?: any) {
        try {
            const userId = req.user.id;
            return Promise.resolve(this.getSignedJwtToken(userId));
        } catch (e) {
            return getInternalErrorErrorResponseHandling(e.message, ERROR_REFESHING_TOKEN).toPromise();
        }
    }
    deleteUserFully(userId: string) {
        return S9DeletedUserModel.findOne({id: userId})
            .then((userToDelete: any) => {
                if (userToDelete) {
                    userToDelete.delete();
                    return {userDeleted: true};
                }
                return getBadRequestErrorResponseHandling(USER_TO_DELETE_NOT_EXISTS);
            });
    }

    getUser(userId: string) {
        return s9UserRepository.getUser(userId).then(S9UserMapper.map);
    }

    getPublicUser(userId: string) {
        return s9UserRepository.getPublicUser(userId).then(S9UserMapper.mapPublicUser);
    }

    findAllUsersAndDeletedUsersById(userIds: string[]) {
        return s9UserRepository.getPublicUsers(userIds).then(users => users.map(S9UserMapper.mapPublicUser));
    }

    findPublicUsers(searchText: string) {
        return s9UserRepository.findUsers(searchText).then(users => users.map(S9UserMapper.mapPublicUser));
    }

    getDeletedUsers() {
        return S9DeletedUserModel.find().then(users => users.map(S9UserMapper.mapPublicUser));
    }

    isAdmin(userId: string) {
        return s9UserRepository.getUser(userId).then(user => Promise.resolve(user && user.role === 'admin'));
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

    updateUserIconUrl(userId: string, iconUrl: string): PromiseLike<any> {
        return s9UserRepository.getUser(userId)
            .then((foundUser: any) => {
                if (!foundUser) {
                    return getBadRequestErrorResponseHandling(ERROR_WHILE_USERS_REQUEST).toPromise();
                    ;
                }

                foundUser.iconUrl = iconUrl;
                return foundUser.save().then(() => foundUser.iconUrl);
            });
    }

    private getSignedJwtToken(userId: string) {
        return jwt.sign({username: userId}, process.env.JWT_KEY, {
            algorithm: "HS256",
            expiresIn: process.env.JWT_TOKEN_EXPIRY
        });
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

    private async executeLogin(req: any) {
        try {
            const {username, password} = req.body;

            const foundLogin = await s9UserRepository.getLoginUser(username, username);

            let passwordMatch = false;
            if (foundLogin) {
                passwordMatch = await bcrypt.compare(password, foundLogin.password);
            }
            if (!username || !password || !foundLogin || !passwordMatch) {
                return getUnauthorizedErrorResponseHandling(USER_NAME_OR_PW_NOT_EXISTS);
            }

            const loggedInUser = User.of(foundLogin);
            loggedInUser.token = this.getSignedJwtToken(foundLogin.id);
            return loggedInUser;
        } catch (err) {
            return getInternalErrorErrorResponseHandling(err, ERROR_WHILE_LOGIN_USER)
        }
    }
}
