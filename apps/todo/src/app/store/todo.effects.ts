import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import {SettingsService} from '../services/settings.service';
import {TodoService} from '../services/todo.service';
import {Settings} from '../types/settings.type';
import {TodoTask} from '../types/todo.types';
import * as actions from './todo.actions';
import * as selectors from './todo.selectors';
import {GlobalState} from './todo.types';


/**
 * Todo Effects.
 */
@Injectable()
export class TodoEffects {
  public loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getTasks),
    mergeMap(() => this.todoService.getTodos().pipe(
      map((todos: TodoTask[]) => actions.getTasksSuccess({todos})),
      catchError(() => of(actions.getTasksFailure()))
    ))
  ));

  public saveTasks$ = createEffect(() => this.actions$.pipe(
    ofType(actions.completeTask),
    concatMap((action) => of(action).pipe(
      withLatestFrom(this.store$.select(selectors.selectTasks)),
      tap(([, tasks]) => this.todoService.saveTodos(tasks)),
      map(() => actions.saveTasksSuccess())
    ))
  ));

  public addTask$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addTask),
    mergeMap(({task}) => {
      this.todoService.addTodo(task);
      return of(actions.getTasks());
    })
  ));

  public getSettings$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getSettings),
    mergeMap(() => this.settingsService.getSettings().pipe(
      map((settings: Settings) => actions.getSettingsSuccess({settings}))
    ))
  ));

  public saveSettings$ = createEffect(() => this.actions$.pipe(
    ofType(actions.saveSettings),
    tap(({settings}) => this.settingsService.saveSettings(settings))
  ), {dispatch: false});

  public saveLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(actions.saveSettings),
    tap(({settings}) => this.translationService.use(settings.language))
  ), {dispatch: false});

  public init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap((_) => [actions.getTasks(), actions.getSettings()])
  ));


  /**
   * Constructor.
   *
   * @param actions$ Actions observable.
   * @param settingsService SettingsService
   * @param todoService Todo Service.
   * @param store$ Store.
   * @param translationService Translation Service.
   *
   */
  public constructor(
    private actions$: Actions,
    private settingsService: SettingsService,
    private todoService: TodoService,
    private store$: Store<GlobalState>,
    private translationService: TranslateService
  ) {}
}
