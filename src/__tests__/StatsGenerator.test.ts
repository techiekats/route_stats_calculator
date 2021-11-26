import { EventEnum } from "../types/EventEnum";
import StatsGenerator from "../types/StatsGenerator";

  test('initial frequencies set to 0', () => {
    const s = new StatsGenerator();
    var result = s.GetEventFrequency();
    expect(result[EventEnum.REQUEST]).toBe(0);
  });

  test('get trip summary - base case', () => {
    const s = new StatsGenerator();
    var riderId = "K1";
    var driverId = "H1";
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.REQUEST);
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.DROPOFF);
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.PICKUP);
    var result = s.GetTripSummary(riderId);
    expect(result["Request to pickup time"]).toBe(0);
    expect(result["Request to drop off time"]).toBe(0);
    expect(result["Pickup to drop off time"]).toBe(0);
    var eventFrequency = s.GetEventFrequency();
    expect(eventFrequency[0]).toBe(1);
    expect(eventFrequency[1]).toBe(1);
    expect(eventFrequency[2]).toBe(1);
  });

  test('get time between - base case', () => {
    const s = new StatsGenerator();
    var riderId = "K1";
    var driverId = "H1";
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.REQUEST);
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.DROPOFF);
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.PICKUP);
    s.AddRecord("K2", driverId, new Date(0), EventEnum.REQUEST);
    var result = s.GetTimeBetween(EventEnum.REQUEST)    
    expect(result.min).toBe(0);
    expect(result.max).toBe(0);
    expect(result.mean).toBe(0);
  });

  test('get trip summary - single user case', () => {
    const s = new StatsGenerator();
    var riderId = "K1";
    var driverId = "H1";
    var now = new Date();
    var pickup = new Date(now.valueOf() + 24*60*60);
    var dropOff = new Date(now.valueOf() + 45*60*60);
    s.AddRecord(riderId, driverId, now, EventEnum.REQUEST);
    s.AddRecord(riderId, driverId, pickup, EventEnum.PICKUP);
    s.AddRecord(riderId, driverId, dropOff , EventEnum.DROPOFF);

    var result = s.GetTripSummary(riderId);
    expect(result["Request to pickup time"]).toBe(pickup.valueOf() - now.valueOf());
    expect(result["Request to drop off time"]).toBe(dropOff.valueOf() - now.valueOf());
    expect(result["Pickup to drop off time"]).toBe(dropOff.valueOf() - pickup.valueOf());
  });

  test('get trip summary - multiple user case', () => {
    const s = new StatsGenerator();
    var riderIds = ["K1", "K2", "K3"];
    var driverId = "H1";
    riderIds.forEach(
      r => {
        var now = new Date();
        var pickup = new Date(now.valueOf() + 24*60*60);
        var dropOff = new Date(pickup.valueOf() + 45*60*60);
        s.AddRecord(r, driverId, now, EventEnum.REQUEST);
        s.AddRecord(r, driverId, pickup, EventEnum.PICKUP);
        s.AddRecord(r, driverId, dropOff , EventEnum.DROPOFF);
      }
    );
   
    riderIds.forEach(
      r=> {
        var result = s.GetTripSummary(r);
        expect(result["Request to pickup time"]).toBe(24*60*60);
        expect(result["Request to drop off time"]).toBe(24*60*60 + 45*60*60);
        expect(result["Pickup to drop off time"]).toBe(45*60*60);
      }
    );
    s.AddRecord("K19", "H19", new Date(), EventEnum.REQUEST);
    var frequency = s.GetEventFrequency();
    expect(frequency[0]).toBe(4);
    expect(frequency[1]).toBe(3);
    expect(frequency[2]).toBe(3);
  });