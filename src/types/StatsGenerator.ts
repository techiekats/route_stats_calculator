import { EventEnum } from "./EventEnum";
import Time from "./Time";
import Trip from "./Trip";

export default class StatsGenerator {
    //TODO: Remove state. all except tripsByRider should be removed    
    private eventFrequency: {[key:string]: number} = {};
    private prevTimeOfEvent: {[key:string]: Date} = {};        
    private eventTypeStats : {[key: string]: {totalTime:number, min: number, max:number, mean: number}} = {};
    private tripsByRider: {[key: string]: Trip} = {};
        
    constructor() {
        this.eventTypeStats[EventEnum.REQUEST] = {totalTime: 0 , min: 0, max: 0, mean: NaN};
        this.eventTypeStats[EventEnum.PICKUP] = {totalTime: 0 , min: 0, max: 0, mean:NaN};
        this.eventTypeStats[EventEnum.DROPOFF] = {totalTime: 0 , min: 0, max: 0, mean:NaN};
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
            if (timeDiff < this.eventTypeStats[eventType].min || this.eventFrequency[eventType] == 1)  
            {
                this.eventTypeStats[eventType].min = timeDiff;
            }
            if (timeDiff > this.eventTypeStats[eventType].max || this.eventFrequency[eventType] == 1)
            {
                this.eventTypeStats[eventType].max = timeDiff;
            }
            this.eventTypeStats[eventType].totalTime = this.eventTypeStats[eventType].totalTime + timeDiff;
        }
        this.eventFrequency[eventType]=this.eventFrequency[eventType] + 1;
        this.prevTimeOfEvent[eventType] = time;
    }

    public GetTripSummary () {
        var result: {[key:string]:{
            "Request to pickup time" : number,
            "Request to drop off time" : number,
            "Pickup to drop off time" : number
        }} = {};
        Object.keys(this.tripsByRider).forEach(x => {
            var summary = {
                "Request to pickup time" : this.tripsByRider[x].GetTimeDifferenceBetweenEvents(EventEnum.REQUEST, EventEnum.PICKUP),
                "Request to drop off time" : this.tripsByRider[x].GetTimeDifferenceBetweenEvents(EventEnum.REQUEST, EventEnum.DROPOFF),
                "Pickup to drop off time" : this.tripsByRider[x].GetTimeDifferenceBetweenEvents(EventEnum.PICKUP, EventEnum.DROPOFF)
            };
            result[x] = summary;            
        });        
        return result;
    }

    //Number of requests, pickups, 
    public GetEventFrequency () {        
        return this.eventFrequency;
    }

    public GetTimeBetween () {
        this.eventTypeStats[EventEnum.REQUEST].mean = this.eventTypeStats[EventEnum.REQUEST].totalTime/(this.eventFrequency[EventEnum.REQUEST] - 1);
        this.eventTypeStats[EventEnum.PICKUP].mean = this.eventTypeStats[EventEnum.PICKUP].totalTime/(this.eventFrequency[EventEnum.PICKUP] - 1);
        this.eventTypeStats[EventEnum.DROPOFF].mean = this.eventTypeStats[EventEnum.DROPOFF].totalTime/(this.eventFrequency[EventEnum.DROPOFF] - 1);
        return this.eventTypeStats;
    }
}