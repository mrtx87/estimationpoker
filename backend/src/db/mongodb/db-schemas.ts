import mongoose, {Schema} from 'mongoose'
import {EstimationPokerRoom} from "../../model/estimation-poker-room";
import {DBUser, DeletedDBUser, User} from "../../model/user";
import {S9Image} from "../../model/s9-image";
import {S9ImageChunk} from "../../model/s9-image-chunk";
import {ObjectId} from "mongodb";
import {S9DocumentRevision} from "../../model/s9DocumentRevision";
import {S9DocumentEditors} from "../../model/s9DocumentEditors";


export const EstimationPokerRoomSchema = new mongoose.Schema<EstimationPokerRoom>({
    id: String,
    createdAt: Number,
    title: String,
});

// TODO INDEX Rooms
//S9DocumentSchema.index({id: -1}, { unique: true });
//S9DocumentSchema.index({ 'body': 'text', 'title': 'text' });

export const S9EditorsSchema = new mongoose.Schema<S9DocumentEditors>({
    documentId:String,
    editors:[String],
});
S9EditorsSchema.index({ documentId: -1}, { unique: true });


export const S9RevisionDocumentSchema = new mongoose.Schema<S9Document>({
    id: String,
    createdAt: Number,
    changedAt: Number,
    title: String,
    body: String,
    author: String,
    tags: [String],
    library: String,
    lastEditedBy: String,
    version: Number
});

export const S9DocumentRevisionSchema = new mongoose.Schema<S9DocumentRevision>({
    id: String,
    documents:[S9RevisionDocumentSchema]

});

S9DocumentRevisionSchema.index({ id: -1}, { unique: true });


export const S9UserSchema = new mongoose.Schema<DBUser>({
    id: String,
    name: String,
    email: String,
    password: String,
    iconUrl: String,
    role: String
});
S9UserSchema.index({id: -1}, { unique: true });
S9UserSchema.index({name: -1}, { unique: true });
S9UserSchema.index({email: -1}, { unique: true });

export const DeletedUserSchema = new mongoose.Schema<DeletedDBUser>({
    id: String,
    name: String,
    iconUrl: String,
});
DeletedUserSchema.index({id: -1}, { unique: true });
DeletedUserSchema.index({name: -1}, { unique: true });


export class S9Tag {
    value: string;
}

export const S9TagSchema = new mongoose.Schema<S9Tag>({
    value: String
});
S9TagSchema.index({value: -1}, { unique: true });


export const S9ImageFileSchema = new mongoose.Schema<S9Image>({
    chunkSize: Number,
    contentType: String,
    filename: String,
    length: Number,
    uploadDate: Date
});

export const S9ImageChunkSchema = new mongoose.Schema<S9ImageChunk>({
    files_id: ObjectId,
    data: String,
    n: Number
});

export const EstimationPokerRoomModel = mongoose.model('S9Document', EstimationPokerRoomSchema);
export const S9ImageFileModel = mongoose.model('images.file', S9ImageFileSchema);
export const S9ImageChunkModel = mongoose.model('images.chunk', S9ImageChunkSchema);
export const S9DocumentRevisionModel = mongoose.model('S9DocumentRevision', S9DocumentRevisionSchema);
export const S9TagModel = mongoose.model('S9Tag', S9TagSchema);
export const S9UserModel = mongoose.model('S9User', S9UserSchema);
export const S9DeletedUserModel = mongoose.model('S9DeletedUser', DeletedUserSchema);
export const S9DocumentEditorsModel = mongoose.model('S9DocumentEditor', S9EditorsSchema);