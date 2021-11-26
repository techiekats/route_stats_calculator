import ILogger from "./ILogger";

export default class Logger implements ILogger {
    LogWarning(title: string, message?: string): void {
        if (!!message) {
            console.log('\x1b[33m%s\x1b[0m',`${title} : ${message}`);
        }
        else {
            console.log('\x1b[33m%s\x1b[0m', title);
        }
    }
    LogException(title: string, exception: string): void {
        console.log(title);
        console.log(exception);
    }
    LogInfo(message:any):void {
        console.log('\x1b[36m%s\x1b[0m',message);
    }
}