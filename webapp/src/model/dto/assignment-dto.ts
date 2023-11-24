export class AssignmentDto {
    assigneeId: string;
    assignerId: string;
    term: string;

    constructor(init: AssignmentDto) {
        this.assigneeId = init.assigneeId;
        this.assignerId = init.assignerId;
        this.term = init.term;
    }
}
