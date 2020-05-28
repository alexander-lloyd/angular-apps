import {MediaMatcher} from '@angular/cdk/layout';
import {Component, Inject, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {faBars, faCog} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';

import {LOG_SERVICE_TOKEN, LoggerService, Logger} from '@al/logger';

import {TodoService} from './services/todo.service';
import {TodoTask} from './types/todo.types';

/**
 * AppComponent.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  public faBars = faBars;
  public faCog = faCog;
  public mobileQuery: MediaQueryList;

  private logger: Logger;
  private _mobileQueryListener: () => void;

  public todos$: Observable<TodoTask[]>;

  /**
   * Constructor.
   *
   * @param logService LoggerService.
   */
  public constructor(
    @Inject(LOG_SERVICE_TOKEN) private logService: LoggerService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private todoService: TodoService
  ) {
    this.logger = this.logService.getLogger('AppComponent');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
