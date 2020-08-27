import {TestBed} from '@angular/core/testing';

import {TodoTask} from '../types/todo.types';
import {TodoService} from './todo.service';
import {LocalStorageService} from './local-storage.service';


class LocalStorageServiceStub {
  public getItem() {}
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
});
