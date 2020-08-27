import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {LocalStorageService} from './local-storage.service';
import {TodoTask} from '../types/todo.types';

/**
 * TodoService.
 */
@Injectable()
export class TodoService {
  public static readonly TODOS_KEY = 'todos';

  /**
   * Constructor.
   *
   * @param localStorage LocalStorageService.
   */
  public constructor(
    private localStorage: LocalStorageService
  ) {}

  /**
   * Get all of the todos.
   *
   * @returns List of todo objects.
   */
  public getTodos(): Observable<TodoTask[]> {
    const todosJson = this.localStorage.getItem(TodoService.TODOS_KEY);
    const todos = JSON.parse(todosJson) as TodoTask[];
    return of(todos);
  }
}
