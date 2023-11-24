import {QuestionPollDTO} from "@/model/dto/question-poll-dto";

export class QuestionDTO {
    questionerId: string;
    value: string
    asSolution: boolean;
    poll: QuestionPollDTO;

    constructor(init: QuestionDTO) {
        this.questionerId = init.questionerId;
        this.value = init.value;
        this.asSolution = init.asSolution;
        this.poll = new QuestionPollDTO(init.poll);
    }


}