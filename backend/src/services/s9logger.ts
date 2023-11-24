class S9logger {

    constructor() {
    }

    log(message: string, additionalMessage: any = null) {
        this.info(message, additionalMessage);
    }

    info(message: string, additionalMessage: any = null) {
        console.log(this.getStatusLogMessage('INFO'), message);
        if (additionalMessage) {
            console.log(this.getStatusLogMessage('INFO'), additionalMessage);
        }
    }

    warn(message: string, additionalMessage: any = null) {
        console.log(this.getStatusLogMessage('WARN'), message);
        if (additionalMessage) {
            console.log(this.getStatusLogMessage('WARN'), additionalMessage);
        }
    }

    error(message: string, additionalMessage: any = null) {
        console.log(this.getStatusLogMessage('ERROR'), message);
        if (additionalMessage) {
            console.log(this.getStatusLogMessage('ERROR'), additionalMessage);
        }
    }

    internalError(error: any) {
        console.error(`ERROR - ${new Date().toISOString()} - `, error);
    }

    private getStatusLogMessage(status: string) {
        return `${status} - ${new Date().toISOString()}`;
    }
}

export const logger = new S9logger();
