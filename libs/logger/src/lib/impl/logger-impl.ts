/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
import {Logger, LoggerService} from '../api';
import {LogLevelImpl} from './log-level-impl';

/**
 * Logger Implementation.
 */
export class LoggerImpl implements Logger {
  /**
   * Constructor.
   *
   * @param loggerName Logger Name.
   * @param parentService Parent Logger Service.
   */
  public constructor(
    private loggerName: string,
    private parentService: LoggerService
  ) {}

  /**
   * Outputs a message to the console with the log level "debug".
   * The message is only displayed to the user if the output is
   * configured to display debug output.
   *
   * @param messages A list of JavaScript objects to output.
   * @param args More arguments.
   */
  public debug(messages?: any, ...args: any[]): void {
    this.log(LogLevelImpl.DEBUG, [messages, ...args]);
  }

  /**
   * Outputs a message to the console with the log level "info".
   * The message is only displayed to the user if the output is
   * configured to display info output.
   *
   * @param messages A list of JavaScript objects to output.
   * @param args More arguments.
   */
  public info(messages?: any, ...args: any[]): void {
    this.log(LogLevelImpl.INFO, [messages, ...args]);
  }

  /**
   * Outputs a message to the console with the log level "warn".
   * The message is only displayed to the user if the output is
   * configured to display warn output.
   *
   * @param messages A list of JavaScript objects to output.
   * @param args More arguments.
   */
  public warn(messages?: any, ...args: any[]): void {
    this.log(LogLevelImpl.WARN, [messages, ...args]);
  }

  /**
   * Outputs a message to the console with the log level "error".
   * The message is only displayed to the user if the output is
   * configured to display error output.
   *
   * @param messages A list of JavaScript objects to output.
   * @param args More arguments.
   */
  public error(messages?: any, ...args: any[]): void {
    this.log(LogLevelImpl.ERROR, [messages, ...args]);
  }

  /**
   * Outputs a message to the console with the log level specified.
   * The message is only displayed to the user if the output is
   * configured to display that log level.
   *
   * @param level The log level.
   * @param messages A list of JavaScript objects to output.
   *
   */
  private log(level: LogLevelImpl, messages: any[]): void {
    this.parentService._onMessage({
      level,
      loggerName: this.loggerName,
      messages,
      timestamp: Date.now()
    });
  }
}
