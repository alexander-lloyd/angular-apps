import {LoggerService} from './api';
import {LoggerServiceImpl} from './logger.service';

describe('Logger Service', () => {
  const nowTime = 1111111111;
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerServiceImpl();
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
      level: 'DEBUG',
      messages: [message],
      loggerName,
      timestamp: nowTime
    });
  });
});
