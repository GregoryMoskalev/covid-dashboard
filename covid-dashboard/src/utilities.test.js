/* eslint-disable */
import { convertNumberToSI, convertDateUSToEU, dailyFromCumulative } from './utilities.js';

test('convert number to SI', () => {
  expect(convertNumberToSI(1000000)).toBe('1M');
  expect(convertNumberToSI(1700000)).toBe('1.7M');
  expect(convertNumberToSI(10000)).toBe('10k');
  expect(convertNumberToSI(100)).toBe(100);
});

test('convert date format from mm/dd/yyyy to dd/mm/yyyy', () => {
  expect(convertDateUSToEU([ '10/29/2020' ])).toStrictEqual([ '29/10/2020' ]);
  expect(convertDateUSToEU([ '12/5/1970' ])).toStrictEqual([ '5/12/1970' ]);
});

test('daily from cumulative data', () => {
  expect(dailyFromCumulative([ 10, 20, 1, 5 ])).toStrictEqual([ 10, 10, 0, 4 ]);
});
