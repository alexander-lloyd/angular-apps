/* eslint-disable @typescript-eslint/no-explicit-any */
import {LogLevel} from './level';

/**
 * Tags.
 */
export interface Tags {
  [key: string]: string;
}

interface BaseMessage {
  /**
   * Unique Id.
   */
  id: string;

  /**
   * Logger name this message originated from.
   */
  loggerName: string;

  /**
   * Unix Timestamp.
   */
  timestamp: number;

  /**
   * Tags
   */
  tags: Tags;
}

/**
 * Log message.
 */
export interface LogMessage extends BaseMessage {
  /**
   * Log level
   */
  level: LogLevel;
  /**
   * Log messages.
   */
  messages: any[];
}

/**
 * Error Message.
 */
export interface ErrorMessage extends BaseMessage {
  /**
   * Error.
   */
  error: Error
}
