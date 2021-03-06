import {Action, createReducer, on} from '@ngrx/store';
import {DEFAULT_SETTINGS} from '../types/settings.type';
import * as actions from './todo.actions';
import {sortTasks} from './todo.selectors';
import {TodoStore} from './todo.types';

export const initialState: TodoStore = {
  todos: [],
  settings: DEFAULT_SETTINGS
};

const _todoReducer = createReducer(
  initialState,
  on(actions.getTasksSuccess, (state, {todos}) => ({
    ...state,
    todos: [...todos].sort(sortTasks)
  })),
  on(actions.addTask, (state, {task}) => {
    const {todos} = state;
    return {
      ...state,
      // Is it going to be better to do an insertion?
      todos: [...todos, task].sort(sortTasks)
    };
  }),
  on(actions.completeTask, (state, {task: completedTask}) => ({
    ...state,
    todos: [
      ...state.todos.map(
        (task) => (task.id === completedTask.id
          ? {
            ...completedTask,
            completed: true
          }
          : task)
      )
    ]
  })),
  on(actions.getSettingsSuccess, actions.saveSettings, (state, {settings}) => ({
    ...state,
    settings
  }))
);

/**
 * Todo Reducer.
 *
 * @param state Application state.
 * @param action An action to perform against the state.
 * @returns The new store.
 */
export function todoReducer(state: TodoStore, action: Action): TodoStore {
  return _todoReducer(state, action);
}
