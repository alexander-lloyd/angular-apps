/* eslint-disable @typescript-eslint/no-explicit-any */
import {LogLevel} from './level';

/**
 * Log message.
 */
export interface LogMessage {
  /**
   * Log level
   */
  level: LogLevel;
  /**
   * Logger name this message orinated from.
   */
  loggerName: string;
  /**
   * Log messages.
   */
  messages: any[];

  /**
   * Unix Timestamp.
   */
  timestamp: number;
}
