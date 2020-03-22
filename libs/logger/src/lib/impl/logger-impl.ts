/* eslint-disable @typescript-eslint/no-explicit-any */
import {Logger, LogLevel, LoggerService} from '../api';


export class LoggerImpl implements Logger {
  public constructor(
    private loggerName: string,
    private parentService: LoggerService
  ) {}

  public debug(messages?: any, ...args: any[]): void {
    this.log('DEBUG', [messages, ...args]);
  }

  public info(messages?: any, ...args: any[]): void {
    this.log('INFO', [messages, ...args]);
  }

  public warn(messages?: any, ...args: any[]): void {
    this.log('WARN', [messages, ...args]);
  }

  public error(messages?: any, ...args: any[]): void {
    this.log('ERROR', [messages, ...args]);
  }

  private log(level: LogLevel, messages: any[]): void {
    this.parentService._onMessage({
      level,
      loggerName: this.loggerName,
      messages
    });
  }
}
