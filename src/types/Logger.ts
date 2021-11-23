import ILogger from "./ILogger";

export default class Logger implements ILogger {
    LogWarning(title: string, message?: string): void {
        if (!!message) {
            console.log(`${title} : ${message}`);
        }
        else {
            console.log(title);
        }
    }
    LogException(title: string, exception: string): void {
        console.log(title);
        console.log(exception);
    }
}