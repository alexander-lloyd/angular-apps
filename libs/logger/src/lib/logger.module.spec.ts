import {async, TestBed} from '@angular/core/testing';

import {LoggerModule} from './logger.module';
import {LogConfigs, LOG_SERVICE_CONFIG_TOKEN} from './api';

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

  it('should allow config to be overridden', () => {
    expect.assertions(1);

    const config: LogConfigs = {
      'CustomComponent': {
        level: 'DEBUG',
        handlers: []
      }
    };

    const newConfig = TestBed.configureTestingModule({
      imports: [LoggerModule]
    }).overrideProvider(LOG_SERVICE_CONFIG_TOKEN, {useFactory: () => config})
      .inject(LOG_SERVICE_CONFIG_TOKEN);

    expect(newConfig).toBe(config);
  });
});
