import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {PublicUser, User} from "../model/user";
import {S9DocumentRevision} from "../model/s9DocumentRevision";
import {S9DocumentEditors} from "../model/s9DocumentEditors";

export class EstimationPokerRoomMapper {

    public static map(init: any): EstimationPokerRoom {
        return new EstimationPokerRoom(init);
    }

}


export class S9UserMapper {

    public static mapPublicUser(init: any): PublicUser {
        return PublicUser.publicUser(init);
    }

    public static map(init: any): User {
        return User.of(init);
    }

}


export class S9DocumentRevisionMapper {

    public static map(init: any): S9DocumentRevisionMapper {
        return new S9DocumentRevision(init);
    }

}

export class S9DocumentEditorMapper {

    public static map(init: any): S9DocumentEditors {
        return new S9DocumentEditors(init);
    }

}