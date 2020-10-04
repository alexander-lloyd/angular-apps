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
      due: 0,
      name: ''
    }];
    const action = actions.getTasksSuccess({todos});

    expect(todoReducer(state, action)).toStrictEqual({
      todos
    });
  });

  it('should add tasks to store in sorted order', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: []
    };
    const todos = [{
      id: 2,
      completed: false,
      due: 1,
      name: ''
    },
    {
      id: 1,
      completed: false,
      due: 0,
      name: ''
    }];

    const action = actions.getTasksSuccess({todos});

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [{
        id: 1,
        completed: false,
        due: 0,
        name: ''
      },
      {
        id: 2,
        completed: false,
        due: 1,
        name: ''
      }]
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
      due: 0,
      name: ''
    };
    const action = actions.addTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [task]
    });
  });

  it('should add a task in sorted order', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: [{
        id: 2,
        completed: false,
        due: 1,
        name: ''
      }]
    };
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 0,
      name: ''
    };
    const action = actions.addTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [
        {
          id: 1,
          completed: false,
          due: 0,
          name: ''
        },
        {
          id: 2,
          completed: false,
          due: 1,
          name: ''
        }
      ]
    });
  });


  it('should complete a task in task list', () => {
    expect.assertions(1);
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 0,
      name: ''
    };
    const state: TodoStore = {
      todos: [task]
    };

    const action = actions.completeTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [{
        ...task,
        completed: true
      }]
    });
  });

  it('should complete tasks in list with multiple tasks', () => {
    expect.assertions(1);
    const tasks: TodoTask[] = [{
      id: 1,
      completed: false,
      due: 0,
      name: ''
    },
    {
      id: 2,
      completed: false,
      due: 0,
      name: ''
    }];
    const state: TodoStore = {
      todos: tasks
    };
    const [task] = tasks;

    const action = actions.completeTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [{
        id: 1,
        completed: true,
        due: 0,
        name: ''
      },
      {
        id: 2,
        completed: false,
        due: 0,
        name: ''
      }]
    });
  });
});
