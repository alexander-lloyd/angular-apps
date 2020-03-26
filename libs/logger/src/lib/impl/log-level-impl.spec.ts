import {LogLevelImpl} from './log-level-impl';
import {LogLevel} from '../api';

describe('LogLevel', () => {
  it.each([
    ['DEBUG', LogLevelImpl.DEBUG],
    ['INFO', LogLevelImpl.INFO],
    ['WARN', LogLevelImpl.WARN],
    ['ERROR', LogLevelImpl.ERROR]
  ])('should have static attriubute %s', (name: string, level: LogLevel) => {
    expect(level).toBeDefined();
    expect(level.name).toBe(name);
    expect(level.level).not.toBeNull();
  });
});
