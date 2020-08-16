import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {TodoTask} from '../types/todo.types';

/**
 * TodoService.
 */
@Injectable()
export class TodoService {
  public static readonly TODOS_KEY = 'todos';

  /**
   * Get all of the todos.
   *
   * @returns List of todo objects.
   */
  public getTodos(): Observable<TodoTask[]> {
    return of([]);
  }
}
