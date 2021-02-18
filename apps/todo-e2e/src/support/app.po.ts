/**
 * Get Settings.
 *
 * @returns Returns the settings object.
 */
export const getSettings = (): Cypress.Chainable<{language: string}> => cy.window().then((window) => JSON
  .parse(window.localStorage.getItem('TODO_SETTINGS')));

/**
 * Get the current language.
 *
 * @returns The current language. E.g. 'en'.
 */
export const getLanguage = (): Cypress.Chainable<string> => getSettings()
  .then((settings) => settings.language);

/**
 * Get the title bar.
 *
 * @returns Chainable.
 */
export const getTitleBar = (): Cypress.Chainable => cy.get('mat-toolbar');

/**
 * Get the settings button.
 *
 * @returns Settings Button.
 */
export const getSettingsButton = (): Cypress.Chainable => cy.get('[data-id=todo-settings-button]');

/**
 * Get the settings dialog.
 *
 * @returns Settings Dialog.
 */
export const getSettingsDialog = (): Cypress.Chainable => cy.get('al-settings-dialog');

/**
 * Get the language select field.
 *
 * @returns Language Select field.
 */
export const getLanguageSelect = (): Cypress.Chainable => cy.get('[data-id="al-todo-settings-language-select"]');

/**
 * Get the settings save button.
 *
 * @returns Settings Dialog.
 */
export const getSaveSettingsButton = (): Cypress.Chainable => cy.get('[data-id="al-todo-settings-save"]');

/**
 * Get the settings cancel button.
 *
 * @returns Settings Dialog.
 */
export const getCancelSettingsButton = (): Cypress.Chainable => cy.get('[data-id="al-todo-settings-cancel"]');

/**
 * Get the main content.
 *
 * @returns Chainable.
 */
export const getMainContent = (): Cypress.Chainable => cy.get('mat-sidenav-content');

/**
 * Get the todo list.
 *
 * @returns Chainable.
 */
export const getTaskList = (): Cypress.Chainable => getMainContent().get('mat-list-item');

/**
 * Get the nth task in the list.
 *
 * @param n Nth element.
 * @returns Chainable.
 */
export const getTask = (n: number): Cypress.Chainable => getTaskList()
  .get('mat-list-item')
  .eq(n);

/**
 * Get the nth task name in the list.
 *
 * @param n Nth element.
 * @returns Chainable.
 */
export const getTaskName = (n: number): Cypress.Chainable => getTask(n)
  .get('.mat-line')
  .eq(n);

/**
 * Get the nth task name in the list.
 *
 * @param n Nth element.
 * @returns Chainable.
 */
export const getTaskDueDate = (n: number): Cypress.Chainable => getTask(n)
  .get('p');

/**
 * Get the nth task checkbox.
 *
 * @param n Nth element.
 * @returns Chainable.
 */
export const getTaskCompleteChecklist = (n: number): Cypress.Chainable => getTask(n)
  .get('mat-checkbox');

/**
 * Get the create todo form.
 *
 * @returns Chainable.
 */
export const getCreateTodoForm = (): Cypress.Chainable => getMainContent().get('al-create-todo');

/**
 * Get the create task input.
 *
 * @returns Chainable.
 */
export const getCreateTodoFormInput = (): Cypress.Chainable => getCreateTodoForm().get('input[name=taskName]');

/**
 * Get the create task input.
 *
 * @returns Chainable.
 */
export const getCreateTodoFormSubmitButton = (): Cypress.Chainable => getCreateTodoForm()
  .get('.al-todo-create-form-button');

/**
 * Get the create form date field.
 *
 * @returns Chainable.
 */
export const getCreateTodoFormDate = (): Cypress.Chainable => getCreateTodoForm()
  .get('mat-chip');

/**
 * Get the create form date field remove button.
 *
 * @returns Chainable.
 */
export const getCreateTodoFormDateCloseButton = (): Cypress.Chainable => getCreateTodoFormDate()
  .get('mat-icon');
