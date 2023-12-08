import {v4 as UUID} from 'uuid';


export class VoteValue {
    label: string;
    color: string;
    numericValue: number;


    constructor(init: Partial<VoteValue>) {
        this.label = init.label;
        this.color = init.color;
        this.numericValue = init.numericValue;
    }


    public static of(init: any): VoteValue {
        return new VoteValue(init);
    }


}