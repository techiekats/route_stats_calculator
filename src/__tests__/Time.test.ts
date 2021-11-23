import Time from "../types/Time";

  test('same times', () => {
    const t = new Time(2, 0);
    expect(t.GetDifferenceInMinutes(t)).toBe(0);
  });

  test('difference in times - same hour', () => {
    const t1 = new Time(2, 0);
    const t2 = new Time(2, 30);
    expect(t2.GetDifferenceInMinutes(t1)).toBe(30);
  });

  test('difference in times - one hour', () => {
    const t1 = new Time(2, 0);
    const t2 = new Time(3, 0);
    expect(t2.GetDifferenceInMinutes(t1)).toBe(60);
  });

  test('difference in times - minutes greater but hours smaller', () => {
    const t1 = new Time(2, 30);
    const t2 = new Time(4, 0);
    expect(t2.GetDifferenceInMinutes(t1)).toBe(90);
  });

  test('difference in times - minutes and hours greater', () => {
    const t1 = new Time(2, 30);
    const t2 = new Time(4, 45);
    expect(t2.GetDifferenceInMinutes(t1)).toBe(135);
  });