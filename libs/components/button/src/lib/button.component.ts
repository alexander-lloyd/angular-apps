/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection */
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

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
  @Input() public disabled = false;
  @Input() public type!: string;

  @Output()
  public click = new EventEmitter<void>();

  @Output()
  public mouseup = new EventEmitter<void>();
}
