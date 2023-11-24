import {S9DeletedUserModel, S9UserModel} from "../db/mongodb/db-schemas";
import {DBUser} from "../model/user";

export class S9UserRepository {
    private static INSTANCE: S9UserRepository = new S9UserRepository();

    public static get s9UserRepository(): S9UserRepository {
        return S9UserRepository.INSTANCE;
    }


    private constructor() {
    }

    createUser(dbUser: DBUser) {
        const s9UserModel = new S9UserModel(dbUser);
        return s9UserModel.save();
    }

    getUser(userId: string) {
        return S9UserModel.findOne({id: userId});
    }

    getUsers(userIds: string[]) {
        return S9UserModel.find({}).where('id').in(userIds);
    }

    async getDeletedUserByName(name: string) {
        return S9DeletedUserModel.findOne({name: name});
    }

    async getPublicUser(userId: string) {
        const activeUser= await S9UserModel.findOne({id: userId});
        if(activeUser) {
            return activeUser;
        }
        return S9DeletedUserModel.findOne({id: userId});
    }

    async getPublicUsers(userIds: string[]) {
        const activeUsers = await  S9UserModel.find().where('id').in(userIds);
        const deletedUsers = await S9DeletedUserModel.find().where('id').in(userIds);
        return [...activeUsers, ...deletedUsers];
    }

    findUsers(searchText: string) {
        return S9UserModel.find({
            name: {$regex: '.*' + searchText + '.*'},
        })
    }

    getUserByEmail(email: string) {
        return S9UserModel.findOne({email: email});
    }

    getLoginUser(username:string, email:string) {
        return S9UserModel.findOne({
            $or: [
                {'name': username},
                {'email': email}
            ]
        })
    }

}
