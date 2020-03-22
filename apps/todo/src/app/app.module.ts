import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoggerModule} from '@al/logger';

/**
 * AppModule.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LoggerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
