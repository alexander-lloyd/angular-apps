import {InjectionToken} from '@angular/core';

import {LogConfigs} from './config';
import {LogHandler} from './handler';
import {LoggerService} from './service';

export const LOG_HANDLERS_TOKEN = new InjectionToken<LogHandler[]>('LOG_HANDLERS_TOKEN');
export const LOG_SERVICE_TOKEN = new InjectionToken<LoggerService>('LOG_SERVICE_TOKEN');
export const LOG_SERVICE_CONFIG_TOKEN = new InjectionToken<LogConfigs>('LOG_SERVICE_CONFIG_TOKEN');
