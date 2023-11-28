import {User} from "./user";

export class ValueOptions {
    id: number;
    name: string;
    values: string[];

    constructor(init: Partial<ValueOptions>) {
        this.id = init.id;
        this.name = init.name;
        this.values = init.values;
    }
}
