import {InjectionToken} from '@angular/core';

import {LogHandler} from './handler';

export const LOG_HANDLERS_TOKEN = new InjectionToken<LogHandler[]>('LOG_HANDLERS_TOKEN');

export const LOG_SERVICE_TOKEN = new InjectionToken('LOG_SERVICE_TOKEN');
