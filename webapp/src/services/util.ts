export function isDev(): boolean {
    return isLocalHost();
}

export function isLocalHost(): boolean {
    return window.location.href.includes('localhost:8080');
}

export class Logger {
    static log(...messages: any) {
        Logger.logGeneral(console.log, messages);
    }

    static warn(...messages: any) {
        Logger.logGeneral(console.warn, messages);
    }

    static error(...messages: any) {
        Logger.logGeneral(console.error, messages);
    }

    static logGeneral(logFunction: (...args: any) => void, messages: any) {
        if (isDev()) {
            logFunction(...messages);
        }
    }
}