/* eslint-disable @angular-eslint/no-output-on-prefix, @angular-eslint/prefer-on-push-component-change-detection */
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Checkbox Component.
 */
@Component({
  selector: 'al-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CheckboxComponent {
  @Input()
  public checked = false;

  @Input()
  public type = 'primary';

  @Input()
  public disabled = false;

  @Output()
  public readonly onChecked: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Called when the checkbox is clicked.
   *
   * @param event Input Event.
   */
  public _onChecked(event: MouseEvent): void {
    this.onChecked.emit((event.target as HTMLInputElement).checked);
  }
}
