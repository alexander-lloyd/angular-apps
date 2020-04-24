import {FormatTimePipe} from './format-time.pipe';

describe('Format Time Pipe', () => {
  it.each([
    [0, '0:00'],
    [1000, '0:01'],
    [50000, '0:50'],
    [60000, '1:00'],
    [61000, '1:01'],
    [3600000, '1:00:00'],
    [4200000, '1:10:00']
  ])('should format %s as %s', (ms, formatted) => {
    expect.assertions(1);
    const pipe = new FormatTimePipe();
    expect(pipe.transform(ms)).toBe(formatted);
  });
});
