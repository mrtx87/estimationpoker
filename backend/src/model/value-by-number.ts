import {VoteValue} from "./vote-value";

export class ValueByAmount {
    voteValue: VoteValue;
    amount: number;

    constructor(init: Partial<ValueByAmount>) {
        this.voteValue = init.voteValue;
        this.amount = init.amount;
    }
    public static of(init: any): ValueByAmount {
        return new ValueByAmount(init);
    }
}