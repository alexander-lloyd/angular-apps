import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardFooterItemComponent} from './dashboard-footer-item.component';

describe('DashboardFooterItemComponent', () => {
  let component: DashboardFooterItemComponent;
  let fixture: ComponentFixture<DashboardFooterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFooterItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardFooterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
