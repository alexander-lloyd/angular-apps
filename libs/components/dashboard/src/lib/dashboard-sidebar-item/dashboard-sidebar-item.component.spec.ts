import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardSidebarItemComponent} from './dashboard-sidebar-item.component';

describe('AlDashboardSidebarItemComponent', () => {
  let component: DashboardSidebarItemComponent;
  let fixture: ComponentFixture<DashboardSidebarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
