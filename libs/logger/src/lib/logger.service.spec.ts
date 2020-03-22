import {LoggerService} from './api';
import {LoggerServiceImpl} from './logger.service';

describe('Logger Service', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerServiceImpl();
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
      loggerName
    });
  });
});
