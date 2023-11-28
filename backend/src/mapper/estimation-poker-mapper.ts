import {EstimationPokerRoom} from "../model/estimation-poker-room";
import {User} from "../model/user";

export class EstimationPokerRoomMapper {

    public static map(init: any): EstimationPokerRoom {
        return new EstimationPokerRoom(init);
    }

}
