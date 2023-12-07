import {Vote} from "./vote";
import {EstimationTimer} from "./estimation-timer";
import {Evaluation} from "./evaluation";
import {ValueOptions} from "./value-option";

export class Estimation {
    id: string;
    roomId: string
    createdAt: number;
    title: string;
    state: number; // voting, revealed, closed
    timer: EstimationTimer;
    votes: Vote[];
    evaluation: Evaluation;
    valueOptionsId: number;

    constructor(init: Partial<Estimation>) {
        this.id = init.id;
        this.roomId = init.roomId;
        this.createdAt = init.createdAt;
        this.title = init.title;
        this.timer = EstimationTimer.of(init.timer);
        this.votes = init.votes.map(Vote.of);
        this.evaluation = Evaluation.of(init.evaluation);
        this.valueOptionsId = init.valueOptionsId;
        this.state = init.state;
    }


    public static of(init: any): Estimation {
        return new Estimation(init);
    }

    reset() {
        this.votes = [];
        this.evaluation.reset();
    }

}