import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

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
   * @param localStorageService Local Storage Service.
   */
  public constructor(
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Get all of the todos.
   *
   * @returns List of todo objects.
   */
  public getTodos(): Observable<TodoTask[]> {
    return this.localStorageService.getItem(TodoService.TODOS_KEY);
  }
}
