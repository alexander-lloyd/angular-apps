import {NgModule, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LOG_HANDLERS_TOKEN, LOG_SERVICE_TOKEN} from './api';
import {ConsoleHandler} from './impl';
import {LoggerServiceImpl} from './logger.service';

const logProviders: ValueProvider = {
  provide: LOG_HANDLERS_TOKEN,
  useValue: ConsoleHandler,
  multi: true
};

const logServiceProvider: ValueProvider = {
  provide: LOG_SERVICE_TOKEN,
  useValue: LoggerServiceImpl
};

/**
 * Logger Module.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    logProviders,
    logServiceProvider
  ]
})
export class LoggerModule {}
