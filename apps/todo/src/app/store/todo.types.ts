import {TodoTask} from '../types/todo.types';

export interface TodoStore {
  todos: TodoTask[];
}

export interface GlobalState {
  todo: TodoStore;
}

export interface AddTodoActionProperties {
  task: TodoTask;
}

export interface GetTodoSuccessProperties {
  todos: TodoTask[];
}
