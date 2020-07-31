import {TestBed} from '@angular/core/testing';
import {ButtonModule} from './button.module';

describe('ComponentsButtonModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
    }).compileComponents();
  });

  it('should have a module definition', () => {
    expect.assertions(1);
    expect(ButtonModule).toBeDefined();
  });
});
