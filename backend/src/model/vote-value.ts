import {v4 as UUID} from 'uuid';


export class VoteValue {
    value: string;
    color: string;
    numericValue: number;


    constructor(init: Partial<VoteValue>) {
        this.value = init.value;
        this.color = init.color;
        this.numericValue = init.numericValue;
    }


    public static of(init: any): VoteValue {
        return new VoteValue(init);
    }


}