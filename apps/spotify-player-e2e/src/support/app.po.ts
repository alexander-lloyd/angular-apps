/**
 * Get the App root.
 *
 * @returns Cypress Chainable.
 */
export const getApp = (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('al-root');

/**
 * Get the login button.
 *
 * @returns Cypress Chainable HtmlButton.
 */
export const getLoginButton = (): Cypress.Chainable<JQuery<HTMLButtonElement>> => getApp().get('button');
