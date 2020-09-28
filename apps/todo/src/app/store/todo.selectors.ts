import {createSelector} from '@ngrx/store';
import {GlobalState, TodoStore} from './todo.types';
import {TodoTask} from '../types/todo.types';

/**
 * Get the todo app store.
 *
 * @param state The global app state.
 * @returns The todo app store.
 */
export const selectTodo = (state: GlobalState): TodoStore => state.todo;

/**
 * Get the list of todos.
 *
 * @param state The global app state.
 * @returns The list of tasks.
 */
export const selectTasks = createSelector(
  selectTodo,
  (state: TodoStore): TodoTask[] => state.todos
);
