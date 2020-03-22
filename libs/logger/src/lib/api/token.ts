import {InjectionToken} from '@angular/core';

import {LogHandler} from './handler';

export const LOG_HANDLERS_TOKEN = new InjectionToken<LogHandler[]>('LOG_HANDLERS_TOKEN');
