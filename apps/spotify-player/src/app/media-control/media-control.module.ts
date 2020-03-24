import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MediaControlComponent} from './media-control.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [],
  declarations: [MediaControlComponent],
  providers: []
})
export class MediaControlModule {}
