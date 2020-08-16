import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {TodoTask} from '../types/todo.types';
import {TodoService} from './todo.service';
import { execPath } from 'process';


describe('TodoService', () => {
  const todo: TodoTask = {
    id: 123,
    name: 'Task',
    completed: false,
    due: new Date().toISOString()
  };

  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        TodoService
      ]
    }).compileComponents();

    service = TestBed.inject(TodoService);
  });

  it('should be truthy', () => {
    expect.assertions(1);
    expect(service).toBeTruthy();
  });

  it('should get the list of todos', async () => {
    expect.assertions(1);
    const todos = await service.getTodos().toPromise();
    expect(todos).toStrictEqual([]);
  });
});
