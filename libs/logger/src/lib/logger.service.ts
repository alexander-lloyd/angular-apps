import {Injectable, Inject} from '@angular/core';

import {
  Logger,
  LogMessage,
  LoggerService,
  LogHandler,
  LOG_HANDLERS_TOKEN,
  LOG_SERVICE_CONFIG_TOKEN,
  LogConfigs
} from './api';
import {LoggerImpl} from './impl';

/**
 * Logger Module.
 *
 * Get logger instances.
 */
@Injectable()
export class LoggerServiceImpl implements LoggerService {
  /**
   * Constructor.
   *
   * @param logHandlers Log Handlers.
   * @param logConfig Logger Configuration.
   */
  public constructor(
    @Inject(LOG_HANDLERS_TOKEN) private logHandlers: LogHandler[],
    @Inject(LOG_SERVICE_CONFIG_TOKEN) private logConfig: LogConfigs
  ) {}

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
    this.logHandlers.forEach((handler: LogHandler) => handler.onMessage(message));
  }


  private shouldLog(loggerName: string, logLevel: string, handler: string) {
    const config = this.logConfig[loggerName];
  }
}
