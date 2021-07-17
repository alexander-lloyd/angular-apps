import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

/**
 * Dashboard Component.
 */
@Component({
  selector: 'al-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DashboardComponent {
}
