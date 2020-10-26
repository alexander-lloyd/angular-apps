import {MediaMatcher} from '@angular/cdk/layout';
import {Component, Inject, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {faBars, faCog} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {LOG_SERVICE_TOKEN, LoggerService, Logger} from '@al/logger';

import {SettingsDialogComponent} from './components/settings-dialog/settings-dialog.component';
import * as actions from './store/todo.actions';
import {TodoTask} from './types/todo.types';
import {GlobalState} from './store/todo.types';
import * as selectors from './store/todo.selectors';

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
  public _mobileQueryListener: () => void;

  public todos$: Observable<TodoTask[]>;

  /**
   * Constructor.
   *
   * @param logService LoggerService.
   * @param changeDetectorRef change detector reference.
   * @param media media matcher.
   * @param store Global Store.
   * @param translate Translation Service.
   * @param dialog dialog service.
   */
  public constructor(
    @Inject(LOG_SERVICE_TOKEN) private logService: LoggerService,
    public changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private store: Store<GlobalState>,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    this.logger = this.logService.getLogger('AppComponent');
    this.setLanguage();
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnInit(): void {
    this.todos$ = this.store.select(selectors.selectOpenTasks);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Callback called to add a task.
   *
   * @param task Todo task.
   */
  public addTask(task: TodoTask): void {
    this.store.dispatch(actions.addTask({task}));
  }

  /**
   * Callback called when a task is completed.
   *
   * @param task Todo task.
   */
  public taskCompleted(task: TodoTask): void {
    this.store.dispatch(actions.completeTask({task}));
  }

  /**
   * Open Settings Dialog.
   */
  public openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent);
  }

  private setLanguage(): void {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    this.store.select(selectors.selectLanguage).subscribe((language: string) => {
      this.translate.use(language);
    });
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/u) ? browserLang : 'en');
  }
}
