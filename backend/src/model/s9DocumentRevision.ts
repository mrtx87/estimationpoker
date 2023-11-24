import {S9Document} from "./estimation-poker-room";
import {S9Mapper} from "../mapper/s9-mapper";


export class S9DocumentRevision {
    id: string;
    documents: S9Document[];

    constructor(init: Partial<S9DocumentRevision>) {
        this.id = init.id;
        this.documents = init.documents.map(S9Mapper.map);
    }

    public static of(init: any): S9DocumentRevision {
        return new S9DocumentRevision(init);
    }


}