import {Logger} from './logger';
import {LogMessage} from './message';

/**
 * LoggerService.
 */
export interface LoggerService {
  /**
   * Get a logger.
   *
   * @param loggerName unique name of logger.
   * @returns A logger instance.
   */
  getLogger(loggerName: string): Logger;

  /**
   * Called by loggers when a new message is logged.
   *
   * @private
   * @param message Log message.
   */
  _onMessage(message: LogMessage): void;
}
