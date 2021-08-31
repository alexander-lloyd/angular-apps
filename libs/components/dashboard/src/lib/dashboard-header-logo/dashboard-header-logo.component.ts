import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

/**
 * Dashboard Header Logo.
 */
@Component({
  selector: 'al-dashboard-header-logo',
  templateUrl: './dashboard-header-logo.component.html',
  styleUrls: ['./dashboard-header-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DashboardHeaderLogoComponent {

}
