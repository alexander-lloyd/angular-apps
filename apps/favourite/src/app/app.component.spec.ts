import {TestBed} from '@angular/core/testing';

import {DashboardModule} from '@al/dashboard-components';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [DashboardModule]
    }).compileComponents();
  });

  it('should create the app', () => {
    expect.assertions(1);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
