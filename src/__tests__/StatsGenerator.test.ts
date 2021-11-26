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
    var result = s.GetTripSummary();
    expect(result[riderId]["Request to pickup time"]).toBe(0);
    expect(result[riderId]["Request to drop off time"]).toBe(0);
    expect(result[riderId]["Pickup to drop off time"]).toBe(0);
    var eventFrequency = s.GetEventFrequency();
    expect(eventFrequency[EventEnum.REQUEST]).toBe(1);
    expect(eventFrequency[EventEnum.PICKUP]).toBe(1);
    expect(eventFrequency[EventEnum.DROPOFF]).toBe(1);
  });

  test('get time between - base case', () => {
    const s = new StatsGenerator();
    var riderId = "K1";
    var driverId = "H1";
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.REQUEST);
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.DROPOFF);
    s.AddRecord(riderId, driverId, new Date(0), EventEnum.PICKUP);
    s.AddRecord("K2", driverId, new Date(0), EventEnum.REQUEST);
    var result = s.GetTimeBetween();
    expect(result[EventEnum.REQUEST].mean).toBe(0);
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

    var result = s.GetTripSummary();
    expect(result[riderId]["Request to pickup time"]).toBe(pickup.valueOf() - now.valueOf());
    expect(result[riderId]["Request to drop off time"]).toBe(dropOff.valueOf() - now.valueOf());
    expect(result[riderId]["Pickup to drop off time"]).toBe(dropOff.valueOf() - pickup.valueOf());
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
        var result = s.GetTripSummary();
        expect(result[r]["Request to pickup time"]).toBe(24*60*60);
        expect(result[r]["Request to drop off time"]).toBe(24*60*60 + 45*60*60);
        expect(result[r]["Pickup to drop off time"]).toBe(45*60*60);
      }
    );
    s.AddRecord("K19", "H19", new Date(), EventEnum.REQUEST);
    var frequency = s.GetEventFrequency();
    expect(frequency[EventEnum.REQUEST]).toBe(4);
    expect(frequency[EventEnum.PICKUP]).toBe(3);
    expect(frequency[EventEnum.DROPOFF]).toBe(3);
  });

  test('get min max mean times - multiple rides (REQUEST)', () => {
    const s = new StatsGenerator();    
    var driverId = "H1";
    var t = new Date();
    s.AddRecord('K1', driverId, t, EventEnum.REQUEST);
    s.AddRecord('K2', driverId, new Date(t.valueOf() + 100), EventEnum.REQUEST);
    s.AddRecord('K3', driverId, new Date(t.valueOf() + 150), EventEnum.REQUEST);
    s.AddRecord('K4', driverId, new Date(t.valueOf() + 210), EventEnum.REQUEST);
    var result = s.GetTimeBetween();
    expect(result[EventEnum.REQUEST].min).toBe(50);
    expect(result[EventEnum.REQUEST].max).toBe(100);
    expect(result[EventEnum.REQUEST].mean).toBe(70); //(100+50+40)/3 = 70
  });