import { EventEnum } from "../types/EventEnum";
import StatsGenerator from "../types/StatsGenerator";

  test('initial frequencies set to 0', () => {
    const s = new StatsGenerator();
    var result = s.GetEventFrequency();
    console.log(result);
    expect(result[EventEnum.REQUEST]).toBe(0);
  });