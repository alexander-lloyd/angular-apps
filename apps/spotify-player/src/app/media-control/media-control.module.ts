import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {MediaControlComponent} from './media-control.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports: [MediaControlComponent],
  declarations: [MediaControlComponent],
  providers: []
})
export class MediaControlModule {}
