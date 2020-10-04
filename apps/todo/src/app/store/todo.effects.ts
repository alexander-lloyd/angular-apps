import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';

import {TodoService} from '../services/todo.service';
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

  public init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map((_) => actions.getTasks())
  ));


  /**
   * Constructor.
   *
   * @param actions$ Actions observable.
   * @param todoService Todo Service.
   * @param store$ Store.
   *
   */
  public constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store$: Store<GlobalState>
  ) {}
}
