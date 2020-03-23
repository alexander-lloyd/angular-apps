import {NgModule, ClassProvider} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LOG_HANDLERS_TOKEN, LOG_SERVICE_TOKEN} from './api';
import {ConsoleHandler, LoggerServiceImpl} from './impl';

const logHandlerProvider: ClassProvider = {
  provide: LOG_HANDLERS_TOKEN,
  useClass: ConsoleHandler,
  multi: true
};

const logServiceProvider: ClassProvider = {
  provide: LOG_SERVICE_TOKEN,
  useClass: LoggerServiceImpl
};

/**
 * Logger Module.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    logHandlerProvider,
    logServiceProvider
  ]
})
export class LoggerModule {}
