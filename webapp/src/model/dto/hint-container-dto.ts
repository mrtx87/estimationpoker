import {WtfiTimerDto} from "@/model/dto/wtfi-timer-dto.model";
import {HintDto} from "@/model/dto/hint-dto";

export class HintContainerDto {
    currentHintRequest: HintDto;
    giveHintTimeout: WtfiTimerDto;
    adoptHintTimeout: WtfiTimerDto;
    hintGivenTimeout: WtfiTimerDto;

    constructor(init: HintContainerDto) {
        this.currentHintRequest = init.currentHintRequest;
        this.giveHintTimeout = init.giveHintTimeout;
        this.adoptHintTimeout = init.adoptHintTimeout;
        this.hintGivenTimeout = init.hintGivenTimeout;
    }
}