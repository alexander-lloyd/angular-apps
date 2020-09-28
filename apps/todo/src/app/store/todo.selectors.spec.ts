import * as selectors from './todo.selectors';

describe('Todo Selectors', () => {
  it('should get the todo state', () => {
    expect.assertions(1);
    const state = {
      todo: {
        todos: []
      }
    };
    expect(selectors.selectTodo(state)).toBe(state.todo);
  });

  it('should select the tasks', () => {
    expect.assertions(1);
    const state = {
      todos: []
    };
    expect(selectors.selectTasks.projector(state)).toBe(state.todos);
  });
});
