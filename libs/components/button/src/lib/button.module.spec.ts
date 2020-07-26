import { async, TestBed } from '@angular/core/testing';
import { ButtonModule } from './button.module';

describe('ButtonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ButtonModule).toBeDefined();
  });
});
