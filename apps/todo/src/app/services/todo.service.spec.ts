import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {TodoTask} from '../types/todo.types';
import {LocalStorageService} from './local-storage.service';
import {TodoService} from './todo.service';


class LocalStorageServiceStub {
  public getItem(): void {
  }
}

describe('TodoService', () => {
  const todo: TodoTask = {
    id: 123,
    name: 'Task',
    completed: false,
    due: new Date()
  };

  let localStorageService: LocalStorageService;
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        {
          provide: LocalStorageService,
          useClass: LocalStorageServiceStub
        }
      ]
    }).compileComponents();

    localStorageService = TestBed.inject(LocalStorageService);
    service = TestBed.inject(TodoService);
  });

  it('should be truthy', () => {
    expect.assertions(1);
    expect(service).toBeTruthy();
  });

  it('should get the list of todos', () => {
    expect.assertions(1);

    const todos = of([todo]);

    jest.spyOn(localStorageService, 'getItem')
      .mockImplementation(() => todos);

    expect(service.getTodos()).toBe(todos);
  });
});
