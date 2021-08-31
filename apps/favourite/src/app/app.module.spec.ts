import {TestBed} from '@angular/core/testing';
import {AppModule} from './app.module';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  });

  it('should have a module definition', () => {
    expect.assertions(1);
    expect(AppModule).toBeDefined();
  });
});
