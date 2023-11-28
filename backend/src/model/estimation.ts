import {Vote} from "./vote";
import {EstimationTimer} from "./estimation-timer";
import {Evaluation} from "./evaluation";

export class Estimation {
    id: string;
    roomId: string
    createdAt: number;
    title: string;
    state: string; // voting, revealed, closed
    timer: EstimationTimer;
    votes: Vote[];
    evaluation: Evaluation;
    valueOptions: string [];

    constructor(init: Partial<Estimation>) {
        this.id = init.id;
        this.roomId = init.roomId;
        this.createdAt = init.createdAt;
        this.title = init.title;
        this.timer = init.timer;
        this.votes = init.votes;
        this.evaluation = init.evaluation;
        this.valueOptions = init.valueOptions;
    }


    public static of(init: any): Estimation {
        return new Estimation(init);
    }


}