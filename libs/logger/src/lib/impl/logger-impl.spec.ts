import {LoggerImpl} from './logger-impl';
import {LoggerService} from '../api';

describe('Logger Implementation', () => {
  const loggerName = 'ABC';
  let logger: LoggerImpl;
  let parentService: LoggerService;

  beforeEach(() => {
    parentService = {
      _onMessage: jest.fn(),
      getLogger: jest.fn()
    };
    logger = new LoggerImpl(loggerName, parentService);
  });

  it('should pass a debug message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.debug(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: 'DEBUG',
      loggerName,
      messages: [message]
    });
  });

  it('should pass a info message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.info(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: 'INFO',
      loggerName,
      messages: [message]
    });
  });

  it('should pass a warn message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.warn(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: 'WARN',
      loggerName,
      messages: [message]
    });
  });

  it('should pass a error message to the parent service', () => {
    expect.assertions(1);

    const message = 'test message';

    logger.error(message);

    expect(parentService._onMessage).toHaveBeenCalledWith({
      level: 'ERROR',
      loggerName,
      messages: [message]
    });
  });
});
