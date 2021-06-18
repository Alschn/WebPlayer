import {getMsToTime} from "../utils/dataFormat";


describe('Get Milliseconds to Time format', () => {
    test('less than 10 seconds', () => {
    const time = getMsToTime(2_000);
    expect(time).toEqual('2 sec');
  });

  test('less than 10 seconds colon separated', () => {
    const time = getMsToTime(2_000, true);
    expect(time).toEqual('0:02');
  });

  test('less than 60 seconds', () => {
    const time = getMsToTime(24_000);
    expect(time).toEqual('24 sec');
  });

  test('less than 60 seconds colon separated', () => {
    const time = getMsToTime(50000, true);
    expect(time).toEqual('0:50');
  });

  test('less than 60 minutes', () => {
    const time1 = getMsToTime(61_000);
    expect(time1).toEqual('1 min 1 sec');

    const time2 = getMsToTime(125_000);
    expect(time2).toEqual('2 min 5 sec');
  });

  test('less than 60 minutes colon separated', () => {
    const time1 = getMsToTime(240_000, true);
    expect(time1).toEqual('4:00');

    const time2 = getMsToTime(125_000, true);
    expect(time2).toEqual('2:05');
  });

  test('less than 24 hours', () => {
    const time1 = getMsToTime(3_700_000);
    expect(time1).toEqual('1 hrs 1 min');

    const time2 = getMsToTime(7_251_000);
    expect(time2).toEqual('2 hrs 0 min');
  });

  test('less than 24 hours colon separated', () => {
    const time1 = getMsToTime(3_700_000, true);
    expect(time1).toEqual('1:01:40');

    const time2 = getMsToTime(7_251_000, true);
    expect(time2).toEqual('2:00:51');
  });

  test('more than 1 day', () => {
    const time = getMsToTime(91_320_000);
    expect(time).toEqual('1 days 1 hrs');
  });

  test('more than 1 day colon separated', () => {
    const time = getMsToTime(89_320_000, true);
    expect(time).toEqual('1:24:48:40');
  });
})
