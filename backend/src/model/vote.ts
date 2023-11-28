import {v4 as UUID} from 'uuid';


export class Vote {
    estimationId: string;
    userId: string;
    value: string;


    constructor(init: Partial<Vote>) {
        this.estimationId = init.estimationId;
        this.userId = init.userId;
        this.value = init.value;
    }


    public static of(init: any): Vote {
        return new Vote(init);
    }


}