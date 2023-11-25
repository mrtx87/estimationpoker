import mongoose from 'mongoose'
import {EstimationPokerRoom} from "../../model/estimation-poker-room";
import {DBUser} from "../../model/user";

export const EstimationPokerRoomSchema = new mongoose.Schema<EstimationPokerRoom>({
    id: String,
    createdAt: Number,
    title: String,
    userIds:[String]
});

// TODO INDEX Rooms
EstimationPokerRoomSchema.index({id: -1}, { unique: true });
//EstimationPokerRoomSchema.index({ 'body': 'text', 'title': 'text' });

export const UserSchema = new mongoose.Schema<DBUser>({
    id: String,
    name: String,
    roles: [String],
    avatar: String
});
UserSchema.index({id: -1}, { unique: true });
UserSchema.index({name: -1}, { unique: true });




export const EstimationPokerRoomModel = mongoose.model('rooms', EstimationPokerRoomSchema);
export const DBUserModel = mongoose.model('User', UserSchema);
