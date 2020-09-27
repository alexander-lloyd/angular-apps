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
    const todos = this._getTodos();
    return of(todos);
  }

  /**
   * Save a todo to local storage.
   *
   * @param todoTask todo task to save.
   */
  public addTodo(todoTask: TodoTask): void {
    const todos = this._getTodos();
    todos.push(todoTask);
    this._saveTodos(todos);
  }

  /**
   * Get the list of todos from storage.
   *
   * @returns Returns list of tasks.
   */
  private _getTodos(): TodoTask[] {
    const todosJson = this.localStorage.getItem(TodoService.TODOS_KEY) || '[]';
    return JSON.parse(todosJson) as TodoTask[];
  }

  /**
   * Save tasks into storage.
   *
   * @param todos List of all the todo tasks.
   */
  private _saveTodos(todos: TodoTask[]): void {
    const todosJson = JSON.stringify(todos);
    this.localStorage.setItem(TodoService.TODOS_KEY, todosJson);
  }
}
