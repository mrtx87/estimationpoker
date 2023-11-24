import {VoteDTO} from "@/model/dto/vote-dto.model";

export class QuestionPollDTO {
    votes:  VoteDTO[]
    closed: boolean;
    pollResult: {yes: number, no: number}

    constructor(init: QuestionPollDTO) {
        this.votes = init.votes.map(v => new VoteDTO(v));
        this.pollResult = init.pollResult;
        this.closed = init.closed;
    }
}