import {TestBed} from '@angular/core/testing';
import {DashboardModule} from './dashboard.module';

describe('ComponentsDashboardModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModule]
    }).compileComponents();
  });

  it('should have a module definition', () => {
    expect.assertions(1);
    expect(DashboardModule).toBeDefined();
  });
});
