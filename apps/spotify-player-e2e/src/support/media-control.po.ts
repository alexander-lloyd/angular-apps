/**
 * Get the media control Component.
 *
 * @returns Chainable to Media Control Component.
 */
export const getMediaControls = (): Cypress.Chainable<JQuery> => cy.get('al-media-control');
