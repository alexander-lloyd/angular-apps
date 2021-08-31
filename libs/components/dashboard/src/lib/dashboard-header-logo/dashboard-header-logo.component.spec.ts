import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardHeaderLogoComponent} from './dashboard-header-logo.component';

describe('DashboardHeaderLogoComponent', () => {
  let component: DashboardHeaderLogoComponent;
  let fixture: ComponentFixture<DashboardHeaderLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardHeaderLogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHeaderLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
