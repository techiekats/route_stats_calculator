export default class Trip {       
    private requestTime: Date;
    private pickupTime: Date;
    private dropOffTime: Date;
    private driverId: string;
    
    /**
     * Mandatory to have request time to create trip
     */
    constructor(r: Date, d: string) {
        this.requestTime = r;
        this.driverId = d;
        this.pickupTime = new Date(0);
        this.dropOffTime = new Date(0);      
    }

    public SetPickupTime (p: Date) {
        this.pickupTime = p;
    }

    public SetDropoffTime (d: Date) {
        this.dropOffTime = d;
    }
}