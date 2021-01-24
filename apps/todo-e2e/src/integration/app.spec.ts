import * as selectors from '../support/app.po';

describe('todo', () => {
  beforeEach(() => cy.visit('/'));

  it('should have title bar', () => {
    selectors.getTitleBar().contains('Todo App');
  });

  it('should have create todo form', () => {
    selectors.getCreateTodoForm().should('have.length', 1);
  });

  it('should add a todo task', () => {
    const taskName = 'taskName';

    selectors.getTaskList().should('have.length', 0);

    selectors.getCreateTodoFormInput().type(taskName);
    selectors.getCreateTodoFormSubmitButton().click();

    selectors.getTaskList().should('have.length', 1);
    selectors.getTaskName(0).should('contain.text', taskName);
    selectors.getCreateTodoFormInput().should('have.text', '');
  });

  it('should complete a task', () => {
    const taskName = 'taskName';
    selectors.getCreateTodoFormInput().type(taskName);
    selectors.getCreateTodoFormSubmitButton().click();

    selectors.getTaskList().should('have.length', 1);
    selectors.getTaskCompleteChecklist(0).click();
    selectors.getTaskList().should('have.length', 0);
  });

  it('should set a custom date to the task', () => {
    const today = Date.UTC(2020, 6, 7);
    const taskName = 'taskName';

    cy.clock(today, ['Date']);
    selectors.getCreateTodoFormInput().type(`${taskName} ${'2020-06-07'} `);
    selectors.getCreateTodoFormSubmitButton().click();

    selectors.getTaskName(0).should('contain.text', taskName);
    selectors.getTaskDueDate(0).should('contain.text', 'about 1 month');
  });

  it('should be able to remove custom date', () => {
    selectors.getCreateTodoFormDate().should('have.length', 0);
    selectors.getCreateTodoFormInput().type('yyy 2020-02-01 ');

    selectors.getCreateTodoFormDate().should('have.length', 1);
    selectors.getCreateTodoFormDateCloseButton().click();
    selectors.getCreateTodoFormDate().should('have.length', 0);
  });

  it('should order tasks by date', () => {
    selectors.getCreateTodoFormInput().type('yyy 2020-02-01 ');
    selectors.getCreateTodoFormSubmitButton().click();
    cy.wait(100);

    selectors.getCreateTodoFormInput().type('xxx 2020-01-01 ');
    selectors.getCreateTodoFormSubmitButton().click();

    selectors.getTaskName(0).should('contain.text', 'xxx');
    selectors.getTaskName(1).should('contain.text', 'yyy');
  });
});
