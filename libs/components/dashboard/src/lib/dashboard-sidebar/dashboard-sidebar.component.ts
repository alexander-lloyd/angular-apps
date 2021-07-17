import { Component, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';

import {DashboardSidebarItemComponent} from '../dashboard-sidebar-item/dashboard-sidebar-item.component';

@Component({
  selector: 'al-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSidebarComponent {
    @ContentChildren(DashboardSidebarItemComponent)
    set inputSidebarItems(sidebarItems: QueryList<DashboardSidebarItemComponent>) {
      this.sidebarItems = sidebarItems.toArray();
    }

    public sidebarItems!: DashboardSidebarItemComponent[];
}
