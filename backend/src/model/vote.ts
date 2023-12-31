import {v4 as UUID} from 'uuid';
import {VoteValue} from "./vote-value";


export class Vote {
    estimationId: string;
    userId: string;
    value: VoteValue;


    constructor(init: Partial<Vote>) {
        this.estimationId = init.estimationId;
        this.userId = init.userId;
        this.value = init.value ? VoteValue.of(init.value) : null;
    }


    public static of(init: any): Vote {
        return new Vote(init);
    }


}