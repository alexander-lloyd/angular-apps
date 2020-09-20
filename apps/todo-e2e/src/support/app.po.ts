/**
 * Get the title bar.
 *
 * @returns Chainable.
 */
export const getTitleBar = (): Cypress.Chainable => cy.get('mat-toolbar');

/**
 * Get the side nav.
 *
 * @returns Chainable.
 */
export const getMainContent = (): Cypress.Chainable => cy.get('mat-sidenav-content');

/**
 * Get the create todo form.
 *
 * @returns Chainable.
 */
export const getCreateTodoForm = (): Cypress.Chainable => getMainContent().get('al-create-todo');
