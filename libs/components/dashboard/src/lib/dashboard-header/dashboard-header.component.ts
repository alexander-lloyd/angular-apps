import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

/**
 * Dashboard Header Component.
 */
@Component({
  selector: 'al-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DashboardHeaderComponent {

}
