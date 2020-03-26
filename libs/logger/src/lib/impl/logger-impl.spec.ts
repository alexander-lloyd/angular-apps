import {TestBed} from '@angular/core/testing';

import {LoggerService, LOG_SERVICE_TOKEN} from '../api';
import {LoggerImpl} from './logger-impl';
import {LogLevelImpl} from './log-level-impl';

describe('Logger Implementation', () => {
  const loggerName = 'ABC';
  const nowTime = 1111111111;
  let logger: LoggerImpl;
  let parentService: LoggerService;

  beforeEach(() => {
    const mockService = {
      _onMessage: jest.fn(),
      getLogger: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [{
        provide: LOG_SERVICE_TOKEN,
        useValue: mockService
      }]
    });

    parentService = TestBed.inject(LOG_SERVICE_TOKEN);

    logger = new LoggerImpl(loggerName, parentService);
    jest.spyOn(Date, 'now').mockImplementation(() => nowTime);
  });

  it('should pass a debug message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.debug(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: LogLevelImpl.DEBUG,
      loggerName,
      messages: [message],
      timestamp: nowTime
    });
  });

  it('should pass a info message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.info(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: LogLevelImpl.INFO,
      loggerName,
      messages: [message],
      timestamp: nowTime
    });
  });

  it('should pass a warn message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.warn(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: LogLevelImpl.WARN,
      loggerName,
      messages: [message],
      timestamp: nowTime
    });
  });

  it('should pass a error message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.error(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: LogLevelImpl.ERROR,
      loggerName,
      messages: [message],
      timestamp: nowTime
    });
  });
});
