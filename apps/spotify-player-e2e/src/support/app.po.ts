/**
 * Get the App root.
 *
 * @returns Cypress Chainable.
 */
export const getApp = (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('al-root');
