import {async, TestBed} from '@angular/core/testing';
import {LoggerModule} from './logger.module';

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
});
