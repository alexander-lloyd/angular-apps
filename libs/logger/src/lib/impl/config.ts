import {LogConfigs} from '../api';

export const defaultConfig: LogConfigs = {
  '*': {
    level: 'DEBUG',
    handlers: ['console']
  }
};
