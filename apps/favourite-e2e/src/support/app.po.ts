/**
 * Get the greeting.
 *
 * @returns h1 element.
 */
export const getGreeting = (): Cypress.Chainable<JQuery<HTMLHeadingElement>> => cy.get('h1', {includeShadowDom: true});
