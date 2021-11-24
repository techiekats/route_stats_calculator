import { EventEnum } from "./EventEnum";
import Time from "./Time";
import Trip from "./Trip";

export default class StatsGenerator {
    private numberOfRequests = 0; 
    private numberOfPickups = 0; 
    private numberOfDropOffs = 0;
    private tripsByRider: {[key: string]: Trip} = {};
    
    //If Request or pickup, just update data structure. Else, also emit the JSON
    public AddRecord (riderId:string, driverId: string, time: Date,  eventType: EventEnum) : void | string {
        switch (eventType) {
            case EventEnum.REQUEST :
                this.tripsByRider[riderId] = new Trip(time, driverId);
                this.numberOfRequests+=1;
                break;
            case EventEnum.DROPOFF : 
                this.tripsByRider[riderId].SetDropoffTime(time);
                this.numberOfDropOffs +=1;
                break;
            case EventEnum.PICKUP :
                this.tripsByRider[riderId].SetPickupTime(time);
                this.numberOfPickups +=1;
                break;
        }
    }
    
    //Number of requests, pickups, 
    public GetEventFrequency () {
        var result = {
            [EventEnum.REQUEST] : this.numberOfRequests,
            [EventEnum.PICKUP] : this.numberOfPickups,
            [EventEnum.DROPOFF] : this.numberOfDropOffs
        };
        
        return result;
    }

    public GetTimeBetween (eventType: EventEnum) {

    }
}