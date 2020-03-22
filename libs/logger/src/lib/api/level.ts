/* eslint-disable no-magic-numbers */

export type LogLevels =
  | 'DEBUG'
  | 'INFO'
  | 'WARN'
  | 'ERROR';

/**
 * Log Levels.
 */
export class LogLevel {
  public static DEBUG = new LogLevel('DEBUG', 1);
  public static INFO = new LogLevel('INFO', 2);
  public static WARN = new LogLevel('WARN', 3);
  public static ERROR = new LogLevel('ERROR', 4);

  /**
   * Constructor.
   *
   * @param _name Log level name.
   * @param _level Log level value.
   */
  public constructor(
    private _name: string,
    private _level: number
  ) {}

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
