import {TestBed} from '@angular/core/testing';
import {rootEffectsInit} from '@ngrx/effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {Observable, of, throwError} from 'rxjs';

import {TodoService} from '../services/todo.service';
import {TodoTask} from '../types/todo.types';
import * as actions from './todo.actions';
import {TodoEffects} from './todo.effects';


class TodoServiceStub {
  public getTodos() {}
}

describe('TodoEffects', () => {
  let actions$: Observable<Action>;
  let effects: TodoEffects;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        TodoEffects,
        {
          provide: TodoService,
          useClass: TodoServiceStub
        }
      ]
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService);
  });

  it('loadTasks$ should get tasks', async () => {
    expect.assertions(3);
    actions$ = of(actions.getTasks());
    const tasks: TodoTask[] = [{
      id: 1,
      completed: false,
      due: '',
      name: 'Name'
    }];
    const getTodosSpy = jest.spyOn(todoService, 'getTodos').mockImplementation(() => of(tasks));

    await new Promise((resolve) => {
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

    await new Promise((resolve) => {
      effects.loadTasks$.subscribe((action) => {
        expect(getTodosSpy).toHaveBeenCalledTimes(1);
        expect(action.type).toBe(actions.getTasksFailureAction);
        resolve();
      });
    });
  });

  it('should call get tasks on init', async () => {
    expect.assertions(1);
    actions$ = of(rootEffectsInit());

    await new Promise((resolve) => {
      effects.init$.subscribe((action) => {
        expect(action.type).toBe(actions.getTasksAction);
        resolve();
      });
    });
  });
});
