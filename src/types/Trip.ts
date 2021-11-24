import { EventEnum } from "./EventEnum";

export default class Trip {       
    private requestTime: Date;
    private pickupTime: Date;
    private dropOffTime: Date;
    private driverId: string;
    private riderId: string;
    /**
     * Mandatory to have request time to create trip
     */
    constructor(d: Date, driverId: string, riderId: string) {
        this.requestTime = d;
        this.driverId = driverId;
        this.riderId = riderId;
        this.pickupTime = new Date(0);
        this.dropOffTime = new Date(0);      
    }

    public SetPickupTime (p: Date) {
        this.pickupTime = p;
    }

    public SetDropoffTime (d: Date) {
        this.dropOffTime = d;
    }

    public GetTimeDifferenceBetweenEvents(start: EventEnum, end: EventEnum) : number {
        var to: Date;
        var from: Date;
        switch (start){
            case EventEnum.REQUEST:
                from = this.requestTime;
                break;
            case EventEnum.DROPOFF:
                from = this.dropOffTime;
                break;
            case EventEnum.PICKUP:
                from = this.pickupTime;
                break;
        }
        switch (end){
            case EventEnum.REQUEST:
                to = this.requestTime;
                break;
            case EventEnum.DROPOFF:
                to = this.dropOffTime;
                break;
            case EventEnum.PICKUP:
                to = this.pickupTime;
                break;
        }
        return to.valueOf() - from.valueOf();
    }
}