import mongoose from 'mongoose'
import {EstimationPokerRoom} from "../../model/estimation-poker-room";
import {User} from "../../model/user";
import {Avatar} from "../../model/avatar";
import {AvatarElement} from "../../model/avatar-element.model";
import {Estimation} from "../../model/estimation";


const VoteValueObject = {
    label: String,
    color: String,
    numericValue: Number
};

const TimerObject = {
    startTime: Number,
    state: Number,
    passedTime: Number
};

const VoteObject = {
    estimationId: String,
    userId: String,
    value: VoteValueObject
};
export const EstimationSchema = new mongoose.Schema<Estimation>({
    id: String,
    roomId: String,
    createdAt: Number,
    title: String,
    state: Number,
    timer: TimerObject,
    votes: [VoteObject],
    evaluation: {
        estimationId: String,
        avg: Number,
        valuesByAmount: [{
            voteValue: VoteValueObject,
            amount: Number
        }],
        deviation: Number,
        amountOfVotes: Number
    },
    valueOptionsId: Number
});
EstimationSchema.index({id: -1}, {unique: true});
EstimationSchema.index({roomId: -1}, {unique: false});


export const EstimationPokerRoomSchema = new mongoose.Schema<EstimationPokerRoom>({
    id: String,
    createdAt: Number,
    estimationCount: Number,
    roomSettings: {
        title: String,
        valueOptionsId: Number,
        realtimeVoting: Boolean
    },
    currentEstimationId: String
});

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


export const UserSchema = new mongoose.Schema<User>({
    id: String,
    roomId: String,
    name: String,
    roles: [String],
    avatar: AvatarSchema
});
UserSchema.index({id: -1}, {unique: true});
UserSchema.index({roomId: -1}, {unique: false});
UserSchema.index({name: -1}, {unique: false});


export const EstimationPokerRoomModel = mongoose.model('EstimationPokerRoom', EstimationPokerRoomSchema);
export const UserModel = mongoose.model('User', UserSchema);
export const EstimationModel = mongoose.model('Estimation', EstimationSchema);
