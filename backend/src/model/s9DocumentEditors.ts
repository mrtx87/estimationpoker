import {v4 as UUID} from 'uuid';


export class S9DocumentEditors {
    documentId: string;
    editors: string[];

    constructor(init: Partial<S9DocumentEditors>) {
        this.documentId = init.documentId;
        this.editors = init.editors;
    }

}