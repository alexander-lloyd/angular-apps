/**
 * Get the media control Component.
 *
 * @returns Chainable to Media Control Component.
 */
export const getMediaControls = (): Cypress.Chainable<JQuery> => cy.get('al-media-control');

/**
 * Get the Play button.
 *
 * @returns Chainable to Play Button.
 */
export const getPlayButton = (): Cypress.Chainable<JQuery<HTMLButtonElement>> => cy.get('[data-testid=play-button]');

/**
 * Get the Pause button.
 *
 * @returns Chainable to Pause Button.
 */
export const getPauseButton = (): Cypress.Chainable<JQuery<HTMLButtonElement>> => cy.get('[data-testid=pause-button]');
