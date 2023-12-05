import {ESTIMATION_TIMER_STATE} from "../constants/global";

export class EstimationTimer {
    startTime: number; // voting, revealed, closed
    state: number;
    passedTime: number;

    constructor(init: Partial<EstimationTimer>) {
        this.startTime = init.startTime;
        this.passedTime = init.passedTime;
        this.state = init.state;
    }
    public static of(init: any): EstimationTimer {
        return new EstimationTimer(init);
    }

    stopTimer() {
        const previousStartTime = this.startTime;
        this.startTime = Date.now();
        this.passedTime += this.startTime - previousStartTime;
        this.state = ESTIMATION_TIMER_STATE.STOPPED;
    }

    startTimer() {
        this.startTime = Date.now();
        this.state = ESTIMATION_TIMER_STATE.RUNNING;
    }


}