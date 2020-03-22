import {Component, Inject} from '@angular/core';

import {LOG_SERVICE_TOKEN, LoggerService, Logger} from '@al/logger';

/**
 * AppComponent.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'todo';
  private logger: Logger;

  public constructor(
    @Inject(LOG_SERVICE_TOKEN) private logService: LoggerService
  ) {
    this.logger = this.logService.getLogger('AppComponent');
    this.logger.debug('Debug Message');
  }
}
