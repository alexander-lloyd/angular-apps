import {TestBed} from '@angular/core/testing';
import {CheckboxModule} from './checkbox.module';

describe('CheckboxModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxModule]
    }).compileComponents();
  });

  it('should have a module definition', () => {
    expect.assertions(1);
    expect(CheckboxModule).toBeDefined();
  });
});
