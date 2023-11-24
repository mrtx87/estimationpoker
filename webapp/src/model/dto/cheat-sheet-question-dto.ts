export class CheatSheetQuestionDto {
    question: string;
    answer: 0 | 1 | -1;
    solution: boolean;

    constructor(init: CheatSheetQuestionDto) {
        this.question = init.question;
        this.answer = init.answer;
        this.solution = init.solution;
    }
}