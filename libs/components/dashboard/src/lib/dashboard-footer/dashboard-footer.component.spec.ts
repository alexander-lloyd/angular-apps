import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardFooterComponent} from './dashboard-footer.component';

describe('DashboardFooterComponent', () => {
  let component: DashboardFooterComponent;
  let fixture: ComponentFixture<DashboardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
