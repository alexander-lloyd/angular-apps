import {LogMessage} from './message';

/**
 * Handle log messages.
 */
export interface LogHandler {
  /**
   * Handle a log message.
   *
   * @param message Log Message.
   */
  onMessage(message: LogMessage): void;
}
