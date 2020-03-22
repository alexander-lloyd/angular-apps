/* eslint-disable @typescript-eslint/no-explicit-any */
import {Logger, LogLevel, LoggerService} from '../api';

/**
 * Logger Implementation.
 */
export class LoggerImpl implements Logger {
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
    this.log(LogLevel.DEBUG, [messages, ...args]);
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
    this.log(LogLevel.INFO, [messages, ...args]);
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
    this.log(LogLevel.WARN, [messages, ...args]);
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
    this.log(LogLevel.ERROR, [messages, ...args]);
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
  private log(level: LogLevel, messages: any[]): void {
    this.parentService._onMessage({
      level,
      loggerName: this.loggerName,
      messages,
      timestamp: Date.now()
    });
  }
}
