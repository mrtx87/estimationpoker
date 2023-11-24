export class DocumentSearchParams {
    searchText: string;
    tags: string[];
    exactMatch: boolean;
    nextPageObjectId: string;

    constructor(init: Partial<DocumentSearchParams>) {
        this.searchText = init.searchText;
        this.tags = init.tags;
        this.exactMatch = init.exactMatch;
        this.nextPageObjectId = init.nextPageObjectId;
    }

}