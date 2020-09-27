import {TestBed} from '@angular/core/testing';

import {TodoTask} from '../types/todo.types';
import {TodoService} from './todo.service';
import {LocalStorageService} from './local-storage.service';


class LocalStorageServiceStub {
  public getItem() {}
  public setItem() {}
}


describe('TodoService', () => {
  const todo: TodoTask = {
    id: 123,
    name: 'Task',
    completed: false,
    due: new Date().toISOString()
  };

  let localStorageService: LocalStorageService;
  let getItemSpy: jest.SpyInstance<string, [string]>;
  let setItemSpy: jest.SpyInstance<void, [string, string]>;
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        {
          provide: LocalStorageService,
          useClass: LocalStorageServiceStub
        }
      ]
    }).compileComponents();

    service = TestBed.inject(TodoService);
    localStorageService = TestBed.inject(LocalStorageService);
    getItemSpy = jest.spyOn(localStorageService, 'getItem');
    setItemSpy = jest.spyOn(localStorageService, 'setItem');
  });

  it('should be truthy', () => {
    expect.assertions(1);
    expect(service).toBeTruthy();
  });

  it('should get the list of todos', async () => {
    expect.assertions(2);
    getItemSpy.mockImplementation(() => JSON.stringify([todo]));
    const todos = await service.getTodos().toPromise();
    expect(todos).toStrictEqual([todo]);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should return an empty list if local storage key does not exist', async () => {
    expect.assertions(2);
    getItemSpy.mockImplementation(() => undefined);
    const todos = await service.getTodos().toPromise();
    expect(todos).toStrictEqual([]);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should add a todo', () => {
    expect.assertions(2);
    getItemSpy.mockImplementation(() => '[]');
    service.addTodo(todo);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(TodoService.TODOS_KEY, JSON.stringify([todo]));
  });
});
