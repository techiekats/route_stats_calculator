import { EventEnum } from "./EventEnum";
import Time from "./Time";
import Trip from "./Trip";

export default class StatsGenerator {
    //TODO: Remove state. all except tripsByRider should be removed    
    private eventFrequency: {[key:number]: number} = {};
    private prevTimeOfEvent: {[key:number]: Date} = {};        
    private eventTypeStats : {[key: number]: {totalTime:number, min: number, max:number}} = {};
    private tripsByRider: {[key: string]: Trip} = {};
        
    constructor() {
        this.eventTypeStats[EventEnum.REQUEST] = {totalTime: 0 , min: Number.MAX_VALUE, max: Number.MIN_VALUE};
        this.eventTypeStats[EventEnum.PICKUP] = {totalTime: 0 , min: Number.MAX_VALUE, max: Number.MIN_VALUE};
        this.eventTypeStats[EventEnum.DROPOFF] = {totalTime: 0 , min: Number.MAX_VALUE, max: Number.MIN_VALUE};
        this.eventFrequency[EventEnum.REQUEST] = this.eventFrequency[EventEnum.PICKUP] = this.eventFrequency[EventEnum.DROPOFF] = 0;
        this.prevTimeOfEvent[EventEnum.REQUEST] = this.prevTimeOfEvent[EventEnum.PICKUP] = this.prevTimeOfEvent[EventEnum.DROPOFF] = new Date(0);
    }
    
    //If Request or pickup, just update data structure. Else, also emit the JSON
    public AddRecord (riderId:string, driverId: string, time: Date,  eventType: EventEnum) : void {
        if (!this.tripsByRider[riderId]){
            this.tripsByRider[riderId] = new Trip(driverId, riderId);
        }
        this.tripsByRider[riderId].SetEventTime(eventType, time);
        
        var timeDiff = time.valueOf() - this.prevTimeOfEvent[eventType].valueOf();
        if (this.eventFrequency[eventType] > 0) {
            if (timeDiff < this.eventTypeStats[eventType].min)  
            {
                this.eventTypeStats[eventType].min = timeDiff;
            }
            if (timeDiff > this.eventTypeStats[eventType].max)  
            {
                this.eventTypeStats[eventType].max = timeDiff;
            }
            this.eventTypeStats[eventType].totalTime = this.eventTypeStats[eventType].totalTime + timeDiff;
        }
        this.eventFrequency[eventType]=this.eventFrequency[eventType] + 1;
    }
    
    //Assuming this method is being called for a valid trip
    //TODO: Add exception handling for invalid trips
    public GetTripSummary (riderId: string) {
        var summary = {
            "Request to pickup time" : this.tripsByRider[riderId].GetTimeDifferenceBetweenEvents(EventEnum.REQUEST, EventEnum.PICKUP),
            "Request to drop off time" : this.tripsByRider[riderId].GetTimeDifferenceBetweenEvents(EventEnum.REQUEST, EventEnum.DROPOFF),
            "Pickup to drop off time" : this.tripsByRider[riderId].GetTimeDifferenceBetweenEvents(EventEnum.PICKUP, EventEnum.DROPOFF)
        };
        return summary;
    }

    //Number of requests, pickups, 
    public GetEventFrequency () {        
        return this.eventFrequency;
    }

    public GetTimeBetween (eventType: EventEnum) {
        var result = {
            min: this.eventTypeStats[eventType].min == Number.MAX_VALUE ? 0 : this.eventTypeStats[eventType].min,
            max: this.eventTypeStats[eventType].max == Number.MIN_VALUE ? 0 : this.eventTypeStats[eventType].max,
            mean: this.eventTypeStats[eventType].totalTime / this.eventFrequency[eventType]
        };
        return result;
    }
}