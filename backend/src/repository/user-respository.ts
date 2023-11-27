import {DBUserModel} from "../db/mongodb/db-schemas";
import {DBUser} from "../model/user";

export class UserRepository {
    private static INSTANCE: UserRepository = new UserRepository();

    public static get s9UserRepository(): UserRepository {
        return UserRepository.INSTANCE;
    }

    private constructor() {
    }

    createUser(dbUser: DBUser) {
        const s9UserModel = new DBUserModel(dbUser);
        return s9UserModel.save();
    }

    getUser(userId: string) {
        return DBUserModel.findOne({id: userId});
    }

    getUsers(userIds: string[]) {
        return DBUserModel.find().where('id').in(userIds);
    }

    getUsersByRoomId(roomId: string) {
        return DBUserModel.find({roomId: roomId});
    }
    findUsers(searchText: string) {
        return DBUserModel.find({
            name: {$regex: '.*' + searchText + '.*'},
        })
    }

    getUserByEmail(email: string) {
        return DBUserModel.findOne({email: email});
    }

    getLoginUser(username:string, email:string) {
        return DBUserModel.findOne({
            $or: [
                {'name': username},
                {'email': email}
            ]
        });
    }

}
