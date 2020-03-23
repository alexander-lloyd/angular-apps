import {NgModule, ClassProvider, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LOG_HANDLERS_TOKEN, LOG_SERVICE_TOKEN, LOG_SERVICE_CONFIG_TOKEN} from './api';
import {ConsoleHandler, defaultConfig} from './impl';
import {LoggerServiceImpl} from './logger.service';

const logHandlerProvider: ClassProvider = {
  provide: LOG_HANDLERS_TOKEN,
  useClass: ConsoleHandler,
  multi: true
};

const logServiceProvider: ClassProvider = {
  provide: LOG_SERVICE_TOKEN,
  useClass: LoggerServiceImpl
};

const logServiceConfigProvider: ValueProvider = {
  provide: LOG_SERVICE_CONFIG_TOKEN,
  useValue: defaultConfig
};

/**
 * Logger Module.
 */
@NgModule({
  imports: [CommonModule],
  providers: [
    logHandlerProvider,
    logServiceProvider,
    logServiceConfigProvider
  ]
})
export class LoggerModule {}
