import {createAction, props} from '@ngrx/store';
import {AddTodoActionProperties, GetTodoSuccessProperties} from './todo.types';

export const getTasksAction = '[Todo] Get Tasks';
export const getTasksSuccessAction = '[Todo] Get Tasks Success';
export const getTasksFailureAction = '[Todo] Get Tasks Failure';
export const addTaskAction = '[Todo] Add Task';

export const getTasks = createAction(
  getTasksAction
);

export const getTasksSuccess = createAction(
  getTasksSuccessAction,
  props<GetTodoSuccessProperties>()
);

export const getTasksFailure = createAction(
  getTasksFailureAction
);

export const addTask = createAction(
  addTaskAction,
  props<AddTodoActionProperties>()
);
