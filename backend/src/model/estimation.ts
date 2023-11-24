import {v4 as UUID} from 'uuid';


export class Estimation {
    id: string;
    createdAt: number;
    title: string;
    state: string; // voting, revealed, closed
    timer: {
        start: number;
        state: number; // running, stopped
    };
    votes: string[]; // list of votes
    // vote -> userId, userName, value

    constructor(init: Partial<Estimation>) {
        this.id = init.id;
        this.createdAt = init.createdAt;
        this.title = init.title;
    }


    public static of(init: any): Estimation {
        return new Estimation(init);
    }


}