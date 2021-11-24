import { EventEnum } from "./EventEnum";
import Time from "./Time";
import Trip from "./Trip";

export default class StatsGenerator {
    private numberOfRequests = 0; 
    private numberOfPickups = 0; 
    private numberOfDropOffs = 0;
    private tripsByRider: {[key: string]: Trip} = {};
    
    //If Request or pickup, just update data structure. Else, also emit the JSON
    public AddRecord (riderId:string, driverId: string, time: Date,  eventType: EventEnum) : void {
        switch (eventType) {
            case EventEnum.REQUEST :
                this.tripsByRider[riderId] = new Trip(time, driverId, riderId);
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
        var result = {
            [EventEnum.REQUEST] : this.numberOfRequests,
            [EventEnum.PICKUP] : this.numberOfPickups,
            [EventEnum.DROPOFF] : this.numberOfDropOffs
        };
        
        return result;
    }

    public GetTimeBetween (eventType: EventEnum) : number {
        //TODO: implement
        return 0;
    }
}