import {Component, ChangeDetectionStrategy, ContentChildren, QueryList, ViewEncapsulation} from '@angular/core';

import {DashboardSidebarItemComponent} from '../dashboard-sidebar-item/dashboard-sidebar-item.component';

@Component({
  selector: 'al-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DashboardSidebarComponent {
    @ContentChildren(DashboardSidebarItemComponent)
    set inputSidebarItems(sidebarItems: QueryList<DashboardSidebarItemComponent>) {
      this.sidebarItems = sidebarItems.toArray();
    }

    public sidebarItems!: DashboardSidebarItemComponent[];
}
