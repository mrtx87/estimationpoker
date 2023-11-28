import mongoose from 'mongoose'
import {EstimationPokerRoom} from "../../model/estimation-poker-room";
import {DBUser} from "../../model/user";
import {RoomSettings} from "../../model/room-settings";
import {ValueOptions} from "../../model/value-option";
import {Avatar} from "../../model/avatar";
import {AvatarElement} from "../../model/avatar-element.model";


export const ValueOptionsSchema = new mongoose.Schema<ValueOptions>({
    id: Number,
    name: String,
    values: [String]
});

export const RoomSettingsSchema = new mongoose.Schema<RoomSettings>({
    title: String,
    valueOptions: ValueOptionsSchema,
    realTimeVoting: Boolean,
    voteAfterReveal: Boolean,
    autoReveal: Boolean,
});

export const EstimationPokerRoomSchema = new mongoose.Schema<EstimationPokerRoom>({
    id: String,
    createdAt: Number,
    roomSettings: {
        title: String,
        valueOptions: {
            id: Number,
            name: String,
            values: [String]
        },
        realTimeVoting: Boolean,
        voteAfterReveal: Boolean,
        autoReveal: Boolean,
    }
});

// TODO INDEX Rooms
EstimationPokerRoomSchema.index({id: -1}, {unique: true});
//EstimationPokerRoomSchema.index({ 'body': 'text', 'title': 'text' });

export const AvatarElementSchema = new mongoose.Schema<AvatarElement>({
    type: String,
    code: Number,
    color: String
})

export const AvatarSchema = new mongoose.Schema<Avatar>({
    hair: AvatarElementSchema,
    shirt: AvatarElementSchema,
    head: AvatarElementSchema,
})


export const UserSchema = new mongoose.Schema<DBUser>({
    id: String,
    roomId: String,
    name: String,
    roles: [String],
    avatar: AvatarSchema
});
UserSchema.index({id: -1}, {unique: true});
UserSchema.index({roomId: -1}, {unique: false});
UserSchema.index({name: -1}, {unique: false});


export const EstimationPokerRoomModel = mongoose.model('rooms', EstimationPokerRoomSchema);
export const DBUserModel = mongoose.model('User', UserSchema);
