import mongoose from 'mongoose'
import {EstimationPokerRoom} from "../../model/estimation-poker-room";
import {User} from "../../model/user";
import {Avatar} from "../../model/avatar";
import {AvatarElement} from "../../model/avatar-element.model";
import {Estimation} from "../../model/estimation";

export const EstimationSchema = new mongoose.Schema<Estimation>({
    id: String,
    roomId: String,
    createdAt: Number,
    title: String,
    state: Number,
    timer: {
        startTime: Number,
        state: Number,
        passedTime: Number
    },
    votes: [{
        estimationId: String,
        userId: String,
        value: {
            value: String,
            color: String,
            numericValue: Number
        }
    }],
    evaluation: {
        estimationId: String,
        avg: Number,
        valuesByAmount: [{
            value: {
                value: String,
                color: String,
                numericValue: Number
            },
            amount: Number
        }],
        deviation: Number,
        amountOfVotes: Number
    },
    valueOptions: {
        id: Number,
        name: String,
        values: [{
            value: String,
            color: String,
            numericValue: Number
        }]
    }
});
EstimationSchema.index({id: -1}, {unique: true});
EstimationSchema.index({roomId: -1}, {unique: false});


export const EstimationPokerRoomSchema = new mongoose.Schema<EstimationPokerRoom>({
    id: String,
    createdAt: Number,
    estimationCount: Number,
    roomSettings: {
        title: String,
        valueOptions: {
            id: Number,
            name: String,
            values: [{
                value: String,
                color: String,
                numericValue: Number
            }]
        },
        realtimeVoting: Boolean,
        voteAfterReveal: Boolean,
        autoReveal: Boolean,
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


export const EstimationPokerRoomModel = mongoose.model('EstmationPokerRoom', EstimationPokerRoomSchema);
export const UserModel = mongoose.model('User', UserSchema);
export const EstimationModel = mongoose.model('Estimation', EstimationSchema);
