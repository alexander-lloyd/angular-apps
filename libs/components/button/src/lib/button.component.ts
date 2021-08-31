/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

/**
 * Button Component.
 */
@Component({
  selector: 'al-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ButtonComponent {
  @Input() public disabled = false;
  @Input() public type!: string;
}
