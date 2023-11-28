import {UserModel} from "../db/mongodb/db-schemas";
import {User} from "../model/user";
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

    getLoginUser(username:string, email:string) {
        return UserModel.findOne({
            $or: [
                {'name': username},
                {'email': email}
            ]
        });
    }

}
