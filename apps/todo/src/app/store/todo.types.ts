import {TodoTask} from '../types/todo.types';

/**
 * TodoStore Type.
 */
export interface TodoStore {
  todos: TodoTask[];
}

/**
 * GlobalStore Type.
 */
export interface GlobalState {
  todo: TodoStore;
}

/**
 * Add Todo Action Properties.
 */
export interface AddTodoActionProperties {
  task: TodoTask;
}

/**
 * Get Todo Success Properties.
 */
export interface GetTodoSuccessProperties {
  todos: TodoTask[];
}
