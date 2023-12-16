
export class InitAppProcess {
    constructor(mandatorySteps: string[]) {
        this.steps = new Steps();
        this.data = null;
        this.mandatory = mandatorySteps;
    }

    steps: Steps;
    mandatory: string[];
    data: any;
}

export class Steps {
    constructor() {
        this.initAppSettings = 0;
        this.registerExitHandlers = 0;
        this.connectToDB = 0;
        this.requiredConfig = 0;
        this.registerSuperUser = 0;
        this.initWebsocketSettings = 0;
        this.registerTestRoom = 0;
    }
    requiredConfig:number;
    initAppSettings: number;
    initWebsocketSettings:number;
    connectToDB: number;
    registerExitHandlers: number;
    imageCleanup:number;
    registerSuperUser:number;
    registerTestUser:number;
    baseImageGeneration:number;
    testDocuments:number;
    registerTestRoom: number;
}
