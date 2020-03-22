import {NgModule, ClassProvider} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LOG_HANDLERS_TOKEN, LOG_SERVICE_TOKEN} from './api';
import {ConsoleHandler} from './impl';
import {LoggerServiceImpl} from './logger.service';

const logProviders: ClassProvider = {
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
    logProviders,
    logServiceProvider
  ]
})
export class LoggerModule {}
