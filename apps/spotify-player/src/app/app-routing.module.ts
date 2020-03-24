import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MediaControlModule} from './media-control/media-control.module';
import {MediaControlComponent} from './media-control/media-control.component';

const routes: Routes = [{
  path: '',
  component: MediaControlComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MediaControlModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
