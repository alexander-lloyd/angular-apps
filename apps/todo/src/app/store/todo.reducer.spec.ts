import {initialState, todoReducer} from './todo.reducer';
import * as actions from './todo.actions';
import {TodoStore} from './todo.types';
import {TodoTask} from '../types/todo.types';
import {DEFAULT_SETTINGS} from '../types/settings.type';

describe('Todo Reducer', () => {
  it('should get the initial state', () => {
    expect.assertions(1);
    const state = todoReducer(initialState, {type: 'Noop Action'});
    expect(state).toBe(initialState);
  });

  it('should add tasks to store', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: [],
      settings: DEFAULT_SETTINGS
    };
    const todos: TodoTask[] = [{
      id: 1,
      completed: false,
      due: 0,
      name: ''
    }];
    const action = actions.getTasksSuccess({todos});

    expect(todoReducer(state, action)).toStrictEqual({
      settings: DEFAULT_SETTINGS,
      todos
    });
  });

  it('should add tasks to store in sorted order', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: [],
      settings: DEFAULT_SETTINGS
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
      }],
      settings: DEFAULT_SETTINGS
    });
  });

  it('should add a task to the store', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: [],
      settings: DEFAULT_SETTINGS
    };
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 0,
      name: ''
    };
    const action = actions.addTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      settings: DEFAULT_SETTINGS,
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
      }],
      settings: DEFAULT_SETTINGS
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
      ],
      settings: DEFAULT_SETTINGS
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
      todos: [task],
      settings: DEFAULT_SETTINGS
    };

    const action = actions.completeTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      settings: DEFAULT_SETTINGS,
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
      todos: tasks,
      settings: DEFAULT_SETTINGS
    };
    const [task] = tasks;

    const action = actions.completeTask({task});

    expect(todoReducer(state, action)).toStrictEqual({
      settings: DEFAULT_SETTINGS,
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

  it('should update settings', () => {
    expect.assertions(1);
    const state: TodoStore = {
      todos: [],
      settings: {
        language: 'en'
      }
    };

    const action = actions.getSettingsSuccess({
      settings: {
        language: 'fr'
      }
    });

    expect(todoReducer(state, action)).toStrictEqual({
      todos: [],
      settings: {
        language: 'fr'
      }
    });
  });
});
