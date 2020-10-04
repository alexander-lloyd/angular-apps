import {createSelector} from '@ngrx/store';
import {GlobalState, TodoStore} from './todo.types';
import {TodoTask} from '../types/todo.types';

/**
 * Get the todo app store.
 *
 * @param state The global app state.
 * @returns The todo app store.
 */
export const getTodoState = (state: GlobalState): TodoStore => state.todo;

/**
 * Get all the tasks.
 *
 * @param state The todo app state.
 * @returns List of tasks.
 */
export const getTasks = (state: TodoStore): TodoTask[] => state.todos;

/**
 * Get all the open tasks.
 *
 * @param state The todo app state.
 * @returns List of tasks.
 */
export const getOpenTasks = (state: TodoStore): TodoTask[] => getTasks(state)
  .filter((task: TodoTask) => !task.completed);

/**
 * Sort function for tasks.
 *
 * @param taskA The first task.
 * @param taskB The second task.
 * @returns sort value.
 */
export const sortTasks = (taskA: TodoTask, taskB: TodoTask): number => taskA.due - taskB.due;

/**
 * Get the list of tasks.
 *
 * @param state The global app state.
 * @returns The list of tasks.
 */
export const selectTasks = createSelector(
  getTodoState,
  getTasks
);

/**
 * Get the list of open tasks.
 *
 * @param state The global app state.
 * @returns The list of open tasks.
 */
export const selectOpenTasks = createSelector(
  getTodoState,
  getOpenTasks
);
