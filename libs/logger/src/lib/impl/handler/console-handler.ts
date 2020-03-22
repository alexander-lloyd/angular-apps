/* eslint-disable no-console */
import {LogHandler, LogMessage} from '../../api';
import {buildNotImplementedException} from '../error';

/**
 * Output messages to the console.
 */
export class ConsoleHandler implements LogHandler {
  /**
   * Handle a log message.
   *
   * @param message Log Message.
   */
  public onMessage(message: LogMessage): void {
    if (message.level === 'DEBUG') {
      this.onDebug(message);
    } else if (message.level === 'INFO') {
      this.onInfo(message);
    } else if (message.level === 'WARN') {
      this.onWarn(message);
    } else if (message.level === 'ERROR') {
      this.onError(message);
    } else {
      throw buildNotImplementedException(`Log Level ${message.level} is not implemented`);
    }
  }

  /**
   * Log a debug message to the console.
   *
   * @param message Log Message.
   */
  private onDebug({level, loggerName, messages, timestamp}: LogMessage): void {
    console.debug(level, timestamp, loggerName, ...messages);
  }

  /**
   * Log a info message to the console.
   *
   * @param message Log Message.
   */
  private onInfo({level, loggerName, messages, timestamp}: LogMessage): void {
    console.info(level, timestamp, loggerName, ...messages);
  }

  /**
   * Log a warn message to the console.
   *
   * @param message Log Message.
   */
  private onWarn({level, loggerName, messages, timestamp}: LogMessage): void {
    console.warn(level, timestamp, loggerName, ...messages);
  }

  /**
   * Log a error message to the console.
   *
   * @param message Log Message.
   */
  private onError({level, loggerName, messages, timestamp}: LogMessage): void {
    console.error(level, timestamp, loggerName, ...messages);
  }
}
