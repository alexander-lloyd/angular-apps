import {TodoTask} from '../types/todo.types';
import {Settings} from '../types/settings.type';

/**
 * TodoStore Type.
 */
export interface TodoStore {
  todos: TodoTask[];
  settings: Settings
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

/**
 * Complete Task Success Properties.
 */
export interface CompleteTaskProperties {
  task: TodoTask;
}

/**
 * Save Tasks Properties.
 */
export interface SaveTasksProperties {
  tasks: TodoTask[]
}

/**
 * GetSettingSuccessProperties.
 */
export interface GetSettingSuccessProperties {
  settings: Settings;
}

/**
 * SaveSettingSuccessProperties.
 */
export interface SaveSettingSuccessProperties {
  settings: Settings;
}
