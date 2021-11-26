import ILogger from "../../types/ILogger";

export default class MockLogger implements ILogger {
    private _warningCalled = 0;
    public get warningCalled() {
        return this._warningCalled;
    }  
    private _errorCalled = 0;
    public get errorCalled() {
        return this._errorCalled;
    }
    private _infoCalled = 0;
    public get infoCalled() {
        return this._infoCalled;
    }
    LogWarning(title: string, message?: string): void {
        this._warningCalled += 1;
    }
    LogException(title: string, exception: string): void {
        this._errorCalled += 1;
    }
    LogInfo(message:string):void {
        this._infoCalled +=1;
    }

}