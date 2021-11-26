export default interface ILogger {
    LogWarning (title: string, message? : string): void;
    LogException (title: string, exception : string) : void;
    LogInfo (message : string): void;
}