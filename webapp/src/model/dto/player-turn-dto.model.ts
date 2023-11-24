import {QuestionDTO} from "./question-dto.model";
import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";
import {HintContainerDto} from "@/model/dto/hint-container-dto";

export class PlayerTurnDTO {
    questionerId: string;
    question: QuestionDTO;
    questionTimer: WtfiTimerDto;
    pollTimer:WtfiTimerDto;
    state: string;
    hintContainer: HintContainerDto


    constructor(init: PlayerTurnDTO) {
        this.questionerId = init.questionerId;
        this.question = new QuestionDTO(init.question);
        this.questionTimer = init.questionTimer;
        this.pollTimer = init.pollTimer;
        this.state = init.state;
        this.hintContainer = init.hintContainer;
    }
}