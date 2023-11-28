export class EstimationTimer {
    startTime: number; // voting, revealed, closed
    state: 0 | 1;

    constructor(init: Partial<EstimationTimer>) {
        this.startTime = init.startTime;
        this.state = init.state;
    }
    public static of(init: any): EstimationTimer {
        return new EstimationTimer(init);
    }


}