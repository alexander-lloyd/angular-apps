/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

/**
 * Button Component.
 */
@Component({
  selector: 'al-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ButtonComponent {
  @Input() public disabled: boolean;
  @Input() public type: string;
}
