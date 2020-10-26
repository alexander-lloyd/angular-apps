import {createAction, props} from '@ngrx/store';
import {
  AddTodoActionProperties,
  GetTodoSuccessProperties,
  CompleteTaskProperties,
  SaveTasksProperties, GetSettingSuccessProperties, SaveSettingSuccessProperties
} from './todo.types';

export const getTasksAction = '[Todo] Get Tasks';
export const getTasksSuccessAction = '[Todo] Get Tasks Success';
export const getTasksFailureAction = '[Todo] Get Tasks Failure';
export const addTaskAction = '[Todo] Add Task';
export const addTaskSuccessAction = '[Todo] Add Task Success';
export const completeTaskAction = '[Todo] Complete Task';
export const saveTasksAction = '[Todo] Save Tasks';
export const saveTasksSuccessAction = '[Todo] Save Tasks Success';
export const getSettingsAction = '[Todo] Get Settings';
export const getSettingsSuccessAction = '[Todo] Get Settings Success';
export const saveSettingsAction = '[Todo] Save Settings';

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

export const completeTask = createAction(
  completeTaskAction,
  props<CompleteTaskProperties>()
);

export const saveTasks = createAction(
  saveTasksAction,
  props<SaveTasksProperties>()
);

export const saveTasksSuccess = createAction(
  saveTasksSuccessAction
);

export const getSettings = createAction(
  getSettingsAction
);

export const getSettingsSuccess = createAction(
  getSettingsSuccessAction,
  props<GetSettingSuccessProperties>()
);

export const saveSettings = createAction(
  saveSettingsAction,
  props<SaveSettingSuccessProperties>()
);
