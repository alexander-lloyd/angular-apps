import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'al-dashboard-sidebar-item',
  templateUrl: './dashboard-sidebar-item.component.html',
  styleUrls: ['./dashboard-sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSidebarItemComponent {
    @ViewChild(TemplateRef, {static: true})
    public template!: TemplateRef<any>;
}
