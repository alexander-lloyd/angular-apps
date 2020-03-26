/* eslint-disable no-magic-numbers */

import {LogLevel} from '../api';
/**
 * Log Levels.
 */
export class LogLevelImpl implements LogLevel {
  public static DEBUG = new LogLevelImpl('DEBUG', 10);
  public static INFO = new LogLevelImpl('INFO', 20);
  public static WARN = new LogLevelImpl('WARN', 30);
  public static ERROR = new LogLevelImpl('ERROR', 40);
  /**
   * Constructor.
   *
   * @param _name Log level name.
   * @param _level Log level value.
   */
  public constructor(private _name: string, private _level: number) { }
  /**
   * Get the log level name.
   *
   * @returns Log level name.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Get the level name.
   *
   * @returns Level name.
   */
  public get level(): number {
    return this._level;
  }
}
