import {DBUserModel} from "../db/mongodb/db-schemas";
import {DBUser} from "../model/user";

export class S9UserRepository {
    private static INSTANCE: S9UserRepository = new S9UserRepository();

    public static get s9UserRepository(): S9UserRepository {
        return S9UserRepository.INSTANCE;
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
        return DBUserModel.find({}).where('id').in(userIds);
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
        })
    }

}
