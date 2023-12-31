import {ValueByAmount} from "./value-by-number";

export class Evaluation {
    estimationId: string;
    avg:number;
    valuesByAmount: ValueByAmount[];
    deviation: number;
    amountOfVotes: number;
    constructor(init: Partial<Evaluation>) {
        this.estimationId = init.estimationId;
        this.avg = init.avg;
        this.valuesByAmount = init.valuesByAmount.map(ValueByAmount.of);
        this.deviation = init.deviation;
        this.amountOfVotes = init.amountOfVotes;
    }
    public static of(init: any): Evaluation {
        return new Evaluation(init);
    }

    reset() {
        this.avg = 0;
        this.valuesByAmount = [];
        this.deviation = 0;
        this.amountOfVotes = 0;
    }
}