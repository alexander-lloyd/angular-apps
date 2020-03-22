import {Injectable} from '@angular/core';

import {Logger, LogMessage, LoggerService, LogHandler} from './api';
import {LoggerImpl} from './impl';
import {LoggerModule} from './logger.module';
import {ConsoleHandler} from './impl/handler/console-handler';

/**
 * Logger Module.
 *
 * Get logger instances.
 */
@Injectable({providedIn: LoggerModule})
export class LoggerServiceImpl implements LoggerService {
  private logHandler: LogHandler;

  /**
   * Constructor.
   */
  public constructor() {
    this.logHandler = new ConsoleHandler();
  }

  /**
   * Get a logger.
   *
   * @param loggerName unique name of logger.
   * @returns A logger instance.
   */
  public getLogger(loggerName: string): Logger {
    return new LoggerImpl(loggerName, this);
  }


  /**
   * Called by loggers when a new message is logged.
   *
   * @private
   * @param message Log message.
   */
  public _onMessage(message: LogMessage): void {
    this.logHandler.onMessage(message);
  }
}
