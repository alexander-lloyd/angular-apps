/* eslint-disable @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars */
import {LogHandler, LogMessage} from '../../api';

/**
 * Null Log Handler.
 *
 * Does nothing.
 */
export class NullLogHandler implements LogHandler {
  public onMessage(message: LogMessage): void {
  }
}
