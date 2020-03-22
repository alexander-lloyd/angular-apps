import {LogMessage} from './message';

export interface LogHandler {
  onMessage(message: LogMessage): void;
}
