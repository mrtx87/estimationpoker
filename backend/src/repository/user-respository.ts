import {UserModel} from "../db/mongodb/db-schemas";
import {User} from "../model/user";
import {logger} from "../services/s9logger";

export class UserRepository {
    private static INSTANCE: UserRepository = new UserRepository();

    public static get s9UserRepository(): UserRepository {
        return UserRepository.INSTANCE;
    }

    private constructor() {
    }

    createUser(dbUser: User) {
        const s9UserModel = new UserModel(dbUser);
        return s9UserModel.save();
    }

    getUser(userId: string) {
        return UserModel.findOne({id: userId});
    }

    getUsers(userIds: string[]) {
        return UserModel.find().where('id').in(userIds);
    }

    getUsersByRoomId(roomId: string) {
        return UserModel.find({roomId: roomId});
    }

    findUsers(searchText: string) {
        return UserModel.find({
            name: {$regex: '.*' + searchText + '.*'},
        })
    }

    getUserByEmail(email: string) {
        return UserModel.findOne({email: email});
    }

    getLoginUser(username: string, email: string) {
        return UserModel.findOne({
            $or: [
                {'name': username},
                {'email': email}
            ]
        });
    }

    updateUser(userUpdate: User) {
        return this.getUser(userUpdate.id)
            .then(userModel => {
                this.updateUserSafe(userModel, userUpdate);
                return userModel.save().then( u => {
                    u ? logger.info(`stored user: ${u.id} from room: ${u.roomId}`) : logger.error(`stored user missing`);
                    return u;
                });
            });
    }

    deleteUsers(roomId: string) {
        UserModel
            .find({roomId: roomId})
            .then(users => users.forEach(u => u.delete()));
    }


    private updateUserSafe(userModel: any, userUpdate: User) {
        userModel.name = userUpdate.name;
        userModel.avatar = userUpdate.avatar;
        userModel.roles = userUpdate.roles;
    }
}
