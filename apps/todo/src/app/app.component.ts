import {MediaMatcher} from '@angular/cdk/layout';
import {Component, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {faBars, faCog} from '@fortawesome/free-solid-svg-icons';

import {LOG_SERVICE_TOKEN, LoggerService, Logger} from '@al/logger';

/**
 * AppComponent.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public faBars = faBars;
  public faCog = faCog;
  public mobileQuery: MediaQueryList;

  private logger: Logger;
  private _mobileQueryListener: () => void;

  /**
   * Constructor.
   *
   * @param logService LoggerService.
   */
  public constructor(
    @Inject(LOG_SERVICE_TOKEN) private logService: LoggerService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.logger = this.logService.getLogger('AppComponent');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
