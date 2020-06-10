/* eslint-disable no-console */
import {LogHandler, LogMessage} from '../../api';
import {buildNotImplementedException} from '../error';
import {LogLevelImpl} from '../log-level-impl';

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
    if (message.level === LogLevelImpl.DEBUG) {
      this.onDebug(message);
    } else if (message.level === LogLevelImpl.INFO) {
      this.onInfo(message);
    } else if (message.level === LogLevelImpl.WARN) {
      this.onWarn(message);
    } else if (message.level === LogLevelImpl.ERROR) {
      this.onError(message);
    } else {
      throw buildNotImplementedException(`Log Level ${message.level.name} is not implemented`);
    }
  }

  /**
   * Log a debug message to the console.
   *
   * @param message Log Message.
   * @param message.level message log level.
   * @param message.loggerName message logger name.
   * @param message.messages log message.
   * @param message.timestamp message timestamp.
   */
  private onDebug({level, loggerName, messages, timestamp}: LogMessage): void {
    console.debug(level.name, timestamp, loggerName, ...messages);
  }

  /**
   * Log a info message to the console.
   *
   * @param message Log Message.
   * @param message.level message log level.
   * @param message.loggerName message logger name.
   * @param message.messages log message.
   * @param message.timestamp message timestamp.
   */
  private onInfo({level, loggerName, messages, timestamp}: LogMessage): void {
    console.info(level.name, timestamp, loggerName, ...messages);
  }

  /**
   * Log a warn message to the console.
   *
   * @param message Log Message.
   * @param message.level message log level.
   * @param message.loggerName message logger name.
   * @param message.messages log message.
   * @param message.timestamp message timestamp.
   */
  private onWarn({level, loggerName, messages, timestamp}: LogMessage): void {
    console.warn(level.name, timestamp, loggerName, ...messages);
  }

  /**
   * Log a error message to the console.
   *
   * @param message Log Message.
   * @param message.level message log level.
   * @param message.loggerName message logger name.
   * @param message.messages log message.
   * @param message.timestamp message timestamp.
   */
  private onError({level, loggerName, messages, timestamp}: LogMessage): void {
    console.error(level.name, timestamp, loggerName, ...messages);
  }
}
