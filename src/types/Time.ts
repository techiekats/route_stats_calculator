export default class Time
{
    private _hours!: number;
    public get hours(): number {
        return this._hours;
    }
    
    private _minutes!: number;
    public get minutes(): number {
        return this._minutes;
    }
  
    constructor(hour: number, minute: number) {
        this._hours = hour;
        this._minutes = minute;
    }

    public GetDifferenceInMinutes (t: Time) : number {
        let t1 = t.hours * 60 + t.minutes;
        let t2 = this._hours * 60 + this.minutes;
        return Math.abs(t2-t1);
    }
}