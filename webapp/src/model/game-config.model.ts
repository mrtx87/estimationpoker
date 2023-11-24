export class GameConfig {
    termSelectionMode: string;
    timePerQuestion: number;
    timeToAnswer: number;
    language: string;
    allowCheatSheet: boolean;
    hintsPerPlayer: number;
    gameTopic: string;

    constructor(init:GameConfig) {
        this.termSelectionMode = init?.termSelectionMode;
        this.timePerQuestion = init?.timePerQuestion;
        this.timeToAnswer = init?.timeToAnswer;
        this.language = init?.language;
        this.allowCheatSheet = init?.allowCheatSheet;
        this.hintsPerPlayer = init.hintsPerPlayer;
        this.gameTopic = init.gameTopic;
    }
}
