import {Action, createReducer, on} from '@ngrx/store';
import * as actions from './todo.actions';
import {TodoStore} from './todo.types';

export const initialState: TodoStore = {
  todos: []
};

const _todoReducer = createReducer(
  initialState,
  on(actions.getTasksSuccess, (state, {todos}) => ({
    ...state,
    todos
  })),
  on(actions.addTask, (state, {task}) => {
    const {todos} = state;
    return {
      ...state,
      todos: [...todos, task]
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
