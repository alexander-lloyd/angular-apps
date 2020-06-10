/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */
import {LogHandler, LogMessage} from '../../api';

/**
 * Null Log Handler.
 *
 * Does nothing.
 */
export class NullLogHandler implements LogHandler {
  /**
   * Called when log message is received.
   *
   * @param message Log message.
   */
  public onMessage(message: LogMessage): void {
  }
}
