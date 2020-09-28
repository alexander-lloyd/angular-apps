import {initialState, todoReducer} from './todo.reducer';
import * as actions from './todo.actions';
import {TodoStore} from './todo.types';
import {TodoTask} from '../types/todo.types';

describe('Todo Reducer', () => {
  it('should get the initial state', () => {
    expect.assertions(1);
    const state = todoReducer(initialState, {type: 'Noop Action'});
    expect(state).toBe(initialState);
  });

  it('should add tasks to store', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: []
    };
    const todos: TodoTask[] = [{
      id: 1,
      completed: false,
      due: '',
      name: ''
    }];
    const action = actions.getTasksSuccess({todos});

    expect(todoReducer(state, action)).toStrictEqual({
      todos
    });
  });

  it('should add a task to the store', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: []
    };
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: '',
      name: ''
    };
    const action = actions.addTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [task]
    });
  });
});
