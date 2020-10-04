import * as selectors from './todo.selectors';
import {TodoStore} from './todo.types';

describe('Todo Selectors', () => {
  it('should get the todo state', () => {
    expect.assertions(1);
    const state = {
      todo: {
        todos: []
      }
    };
    expect(selectors.getTodoState(state)).toBe(state.todo);
  });

  it('should get the tasks', () => {
    expect.assertions(1);
    const state = {
      todos: []
    };
    expect(selectors.getTasks(state)).toBe(state.todos);
  });

  it('should get open tasks', () => {
    expect.assertions(1);
    const store: TodoStore = {
      todos: [{
        id: 1,
        due: 0,
        completed: false,
        name: ''
      },
      {
        id: 2,
        due: 0,
        completed: true,
        name: ''
      }]
    };
    expect(selectors.getOpenTasks(store)).toStrictEqual([{
      id: 1,
      due: 0,
      completed: false,
      name: ''
    }]);
  });

  it('should select the tasks', () => {
    expect.assertions(1);
    const state = {
      todos: []
    };
    expect(selectors.selectTasks.projector(state)).toBe(state.todos);
  });

  it('should select the open tasks', () => {
    expect.assertions(1);
    const state = {
      todos: [{
        id: 1,
        due: '',
        completed: false,
        name: ''
      },
      {
        id: 2,
        due: '',
        completed: true,
        name: ''
      }]
    };
    expect(selectors.selectOpenTasks.projector(state)).toStrictEqual([{
      id: 1,
      due: '',
      completed: false,
      name: ''
    }]);
  });
});
