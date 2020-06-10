import {LogLevel} from '../api';

const DEBUG_VALUE = 10;
const INFO_VALUE = 20;
const WARN_VALUE = 30;
const ERROR_VALUE = 40;

/**
 * Log Levels.
 */
export class LogLevelImpl implements LogLevel {
  public static DEBUG = new LogLevelImpl('DEBUG', DEBUG_VALUE);
  public static INFO = new LogLevelImpl('INFO', INFO_VALUE);
  public static WARN = new LogLevelImpl('WARN', WARN_VALUE);
  public static ERROR = new LogLevelImpl('ERROR', ERROR_VALUE);
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
