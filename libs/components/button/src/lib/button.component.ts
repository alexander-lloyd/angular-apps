import {Component, Input} from '@angular/core';

/**
 * Button Component.
 */
@Component({
  selector: 'al-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public type: string;
}
