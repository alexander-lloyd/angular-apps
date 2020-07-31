import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonComponent} from './button.component';

/**
 * Button Module.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonModule {}
