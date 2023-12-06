import {VoteValue} from "./vote-value";

export class ValueOptions {
    id: number;
    name: string;
    values: VoteValue[];

    constructor(init: Partial<ValueOptions>) {
        this.id = init.id;
        this.name = init.name;
        this.values = init.values.map(VoteValue.of);
    }

    static of(init: Partial<ValueOptions>) {
        return new ValueOptions(init);
    }
}
