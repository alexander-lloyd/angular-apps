import {LogLevels} from './level';

type LogHandler = string;
type LogHandlers = LogHandler[];

/**
 * A log configuration.
 */
type LogConfig = {
  level: LogLevels;
  handlers: LogHandlers;
};

/**
 * Configure the Logging Service.
 *
 * @example
 * {
 *   'App Component': {
 *     level: 'INFO',
 *     handlers: ['console']
 *   }
 * }
 */
export interface LogConfigs {
  [loggerName: string]: LogConfig;
}
