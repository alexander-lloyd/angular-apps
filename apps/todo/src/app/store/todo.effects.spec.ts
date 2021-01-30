import {TestBed} from '@angular/core/testing';
import {rootEffectsInit} from '@ngrx/effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action, Store} from '@ngrx/store';
import {Observable, of, throwError} from 'rxjs';
import {SettingsService} from '../services/settings.service';

import {TodoService} from '../services/todo.service';
import {TodoTask} from '../types/todo.types';
import * as actions from './todo.actions';
import {TodoEffects} from './todo.effects';


class TodoServiceStub {
  public getTodos() {}
  public addTodo() {}
  public saveTodos() {}
}

class SettingsServiceStub {
  public getSettings() {}
  public saveSettings() {}
}

class StoreStub {
  public select() {}
}

describe('TodoEffects', () => {
  let actions$: Observable<Action>;
  let effects: TodoEffects;
  let todoService: TodoService;
  let settingsService: SettingsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        TodoEffects,
        {
          provide: TodoService,
          useClass: TodoServiceStub
        },
        {
          provide: Store,
          useClass: StoreStub
        },
        {
          provide: SettingsService,
          useClass: SettingsServiceStub
        }
      ]
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService);
    settingsService = TestBed.inject(SettingsService);
    store = TestBed.inject(Store);
  });

  it('loadTasks$ should get tasks', async () => {
    expect.assertions(3);
    actions$ = of(actions.getTasks());
    const tasks: TodoTask[] = [{
      id: 1,
      completed: false,
      due: 0,
      name: 'Name'
    }];
    const getTodosSpy = jest.spyOn(todoService, 'getTodos').mockImplementation(() => of(tasks));

    await new Promise<void>((resolve) => {
      effects.loadTasks$.subscribe((action) => {
        expect(getTodosSpy).toHaveBeenCalledTimes(1);
        expect(action.type).toBe(actions.getTasksSuccessAction);
        expect((action as {todos: TodoTask[]}).todos).toBe(tasks);
        resolve();
      });
    });
  });

  it('loadTasks$ should return failure or service throws error', async () => {
    expect.assertions(2);
    actions$ = of(actions.getTasks());
    const getTodosSpy = jest.spyOn(todoService, 'getTodos').mockImplementation(() => throwError(''));

    await new Promise<void>((resolve) => {
      effects.loadTasks$.subscribe((action) => {
        expect(getTodosSpy).toHaveBeenCalledTimes(1);
        expect(action.type).toBe(actions.getTasksFailureAction);
        resolve();
      });
    });
  });

  it('should save task when task is completed', async () => {
    expect.assertions(3);

    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 0,
      name: 'b'
    };
    actions$ = of(actions.completeTask({task}));
    const saveTodosSpy = jest.spyOn(todoService, 'saveTodos');
    const storeSelectSpy = jest.spyOn(store, 'select')
      .mockImplementation(() => of([]));

    await new Promise<void>((resolve) => {
      effects.saveTasks$.subscribe((action) => {
        expect(saveTodosSpy).toHaveBeenCalledTimes(1);
        expect(storeSelectSpy).toHaveBeenCalledTimes(1);
        expect(action.type).toStrictEqual(actions.saveTasksSuccessAction);
        resolve();
      });
    });
  });

  it('should add a task when a save task action', async () => {
    expect.assertions(2);
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 0,
      name: 'b'
    };
    actions$ = of(actions.addTask({task}));
    const addTodoSpy = jest.spyOn(todoService, 'addTodo').mockImplementation();

    await new Promise<void>((resolve) => {
      effects.addTask$.subscribe((action) => {
        expect(addTodoSpy).toHaveBeenCalledTimes(1);
        expect(action.type).toBe(actions.getTasksAction);
        resolve();
      });
    });
  });

  it('should get settings from storage', async () => {
    expect.assertions(3);
    const settings = {
      language: 'en'
    };
    actions$ = of(actions.getSettings());
    const getSettingsSpy = jest.spyOn(settingsService, 'getSettings').mockImplementation(() => of(settings));

    await new Promise<void>((resolve) => {
      effects.getSettings$.subscribe((action) => {
        expect(action.type).toBe(actions.getSettingsSuccessAction);
        expect(action.settings).toStrictEqual(settings);
        expect(getSettingsSpy).toHaveBeenCalledWith();
        resolve();
      });
    });
  });

  it('should save settings to storage', async () => {
    expect.assertions(2);
    const settings = {
      language: 'en'
    };
    actions$ = of(actions.saveSettings({settings}));
    const saveSettingsSpy = jest.spyOn(settingsService, 'saveSettings');

    await new Promise<void>((resolve) => {
      effects.saveSettings$.subscribe((action) => {
        expect(action.type).toBe(actions.saveSettingsAction);
        expect(saveSettingsSpy).toHaveBeenCalledWith(settings);
        resolve();
      });
    });
  });

  it('should call get tasks on init', async () => {
    expect.assertions(2);
    actions$ = of(rootEffectsInit());

    await new Promise<void>((resolve) => {
      effects.init$.subscribe((action) => {
        expect([actions.getTasksAction, actions.getSettingsAction])
          .toContain(action.type);
        resolve();
      });
    });
  });
});
