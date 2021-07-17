import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'al-dashboard-sidebar-item',
  templateUrl: './dashboard-sidebar-item.component.html',
  styleUrls: ['./dashboard-sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DashboardSidebarItemComponent {
    @ViewChild(TemplateRef, {static: true})
    public template!: TemplateRef<any>;
}
