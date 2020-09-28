import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

import * as actions from './todo.actions';
import {TodoService} from '../services/todo.service';
import {TodoTask} from '../types/todo.types';

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
   *
   */
  public constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}
