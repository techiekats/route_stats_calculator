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
    expect(result).toBe(0);
  });