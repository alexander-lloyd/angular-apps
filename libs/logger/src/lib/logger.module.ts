import {NgModule, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LOG_HANDLERS_TOKEN} from './api/token';
import {ConsoleHandler} from './impl';

const logProviders: ValueProvider = {
  provide: LOG_HANDLERS_TOKEN,
  useValue: ConsoleHandler,
  multi: true
};

/**
 * Logger Module.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    logProviders
  ]
})
export class LoggerModule {}
