import {async, TestBed} from '@angular/core/testing';

import {LoggerModule} from './logger.module';
import {LOG_SERVICE_TOKEN} from './api';

describe('LoggerModule', () => {
  beforeEach(async(() => {
    expect.assertions(1);
    TestBed.configureTestingModule({
      imports: [LoggerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect.assertions(1);
    expect(LoggerModule).toBeDefined();
  });

  it('should allow logging in default configuration', () => {
    expect.assertions(1);

    const loggerName = 'Test Logger';
    const nowTime = 1;
    const message = ['Message'];

    // Mock Console + Date.
    jest.spyOn(Date, 'now').mockImplementation(() => nowTime);
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});

    const testService = TestBed.configureTestingModule({
      imports: [LoggerModule]
    }).inject(LOG_SERVICE_TOKEN);

    const logger = testService.getLogger(loggerName);
    logger.debug(...message);

    expect(consoleSpy).toHaveBeenCalledWith(
      'DEBUG',
      nowTime,
      loggerName,
      ...message
    );
  });
});
