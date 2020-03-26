/**
 * Log Levels.
 */
export type LogLevels =
  | 'DEBUG'
  | 'INFO'
  | 'WARN'
  | 'ERROR';

/**
 * Log Levels.
 */
export interface LogLevel {
  name: string;
  level: number;
}
