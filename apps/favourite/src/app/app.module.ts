import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DashboardModule} from '@al/dashboard-components';

import {AppComponent} from './app.component';

/**
 * AppModule.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DashboardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
