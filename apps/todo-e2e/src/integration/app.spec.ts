import {getCreateTodoForm, getTitleBar} from '../support/app.po';

describe('todo', () => {
  beforeEach(() => cy.visit('/'));

  it('should have title bar', () => {
    getTitleBar().contains('Todo App');
  });

  it('should have create todo form', () => {
    getCreateTodoForm().should('have.length', 1);
  });
});
