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

export function isValidRoomId(roomId: string): boolean {
    return Boolean(roomId) && roomId.match(/^\w{8}-(\w{4}-){3}\w{12}$/i) !== null;
}

export function randomInt(num: number) {
    return Math.floor(Math.random() * num);
}

export function randomSelection(arr: any[]) {
    return arr[randomInt(arr.length)];
}

export function randomColor(colorOptions: string[]): string {
    return randomSelection(colorOptions);
}