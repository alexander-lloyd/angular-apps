import {TestBed} from '@angular/core/testing';

import {LoggerService, LogMessage, LOG_HANDLERS_TOKEN, LogHandler, LogLevel, LOG_SERVICE_CONFIG_TOKEN} from './api';
import {LoggerServiceImpl} from './logger.service';
import {NullLogHandler} from './impl/handler/null-handler';
import {defaultConfig} from './impl';

describe('Logger Service', () => {
  const nowTime = 1111111111;
  let service: LoggerService;
  let logHandler: LogHandler;

  beforeEach(() => {
    logHandler = new NullLogHandler();

    service = TestBed
      .configureTestingModule({
        providers: [
          LoggerServiceImpl,
          {
            provide: LOG_HANDLERS_TOKEN,
            useValue: logHandler,
            multi: true
          },
          {
            provide: LOG_SERVICE_CONFIG_TOKEN,
            useValue: defaultConfig
          }
        ]
      })
      .inject(LoggerServiceImpl);

    jest.spyOn(Date, 'now').mockImplementation(() => nowTime);
  });

  it('should get a new logger instance', () => {
    expect.assertions(1);
    expect(service.getLogger('logger')).not.toBeNull();
  });

  it('should get called by child logger', () => {
    expect.assertions(1);

    const serviceSpy = jest.spyOn(service, '_onMessage')
      .mockImplementation(() => {});
    const loggerName = 'logger';
    const child = service.getLogger(loggerName);
    const message = 'abc';

    child.debug(message);

    expect(serviceSpy).toHaveBeenCalledWith({
      level: LogLevel.DEBUG,
      messages: [message],
      loggerName,
      timestamp: nowTime
    });
  });

  it('should call a log handler', () => {
    expect.assertions(1);

    const onMessageHandler = jest.spyOn(logHandler, 'onMessage');

    const message: LogMessage = {
      level: LogLevel.DEBUG,
      loggerName: 'loggerName',
      messages: ['messages'],
      timestamp: 1
    };

    service._onMessage(message);

    expect(onMessageHandler).toHaveBeenCalledWith(message);
  });
});
