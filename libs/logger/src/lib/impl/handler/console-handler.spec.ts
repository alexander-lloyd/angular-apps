import {LogMessage, LogLevel} from '../../api';
import {ConsoleHandler} from './console-handler';
import {buildNotImplementedException} from '../error';

describe('Console Log Handler', () => {
  it('should output a debug message', () => {
    expect.assertions(1);
    const consoleMock = jest.spyOn(console, 'debug').mockImplementation(() => {});

    const message: LogMessage = {
      level: 'DEBUG',
      loggerName: 'logger',
      messages: ['message'],
      timestamp: 1
    };

    const logHandler = new ConsoleHandler();
    logHandler.onMessage(message);
    expect(consoleMock).toHaveBeenCalledTimes(1);
  });

  it('should output a info message', () => {
    expect.assertions(1);
    const consoleMock = jest.spyOn(console, 'info').mockImplementation(() => {});

    const message: LogMessage = {
      level: 'INFO',
      loggerName: 'logger',
      messages: ['message'],
      timestamp: 1
    };

    const logHandler = new ConsoleHandler();
    logHandler.onMessage(message);
    expect(consoleMock).toHaveBeenCalledTimes(1);
  });

  it('should output a warn message', () => {
    expect.assertions(1);
    const consoleMock = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const message: LogMessage = {
      level: 'WARN',
      loggerName: 'logger',
      messages: ['message'],
      timestamp: 1
    };

    const logHandler = new ConsoleHandler();
    logHandler.onMessage(message);
    expect(consoleMock).toHaveBeenCalledTimes(1);
  });

  it('should output a error message', () => {
    expect.assertions(1);
    const consoleMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const message: LogMessage = {
      level: 'ERROR',
      loggerName: 'logger',
      messages: ['message'],
      timestamp: 1
    };

    const logHandler = new ConsoleHandler();
    logHandler.onMessage(message);
    expect(consoleMock).toHaveBeenCalledTimes(1);
  });

  it('should output an error if unexpected log level', () => {
    expect.assertions(1);

    const message: LogMessage = {
      level: 'DOES NOT EXIST' as LogLevel,
      loggerName: 'logger',
      messages: ['message'],
      timestamp: 1
    };

    const logHandler = new ConsoleHandler();
    expect(() => logHandler.onMessage(message))
      .toThrow(buildNotImplementedException('Log Level DOES NOT EXIST is not implemented'));
  });
});
