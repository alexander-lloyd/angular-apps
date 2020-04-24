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

/**
 * Get the Previous button.
 *
 * @returns Chainable to Previous Button.
 */
export const getPreviousButton = (): Cypress.Chainable<JQuery<HTMLButtonElement>> => cy.get('[data-testid=previous-button]');

/**
 * Get the Skip button.
 *
 * @returns Chainable to Skip Button.
 */
export const getSkipButton = (): Cypress.Chainable<JQuery<HTMLButtonElement>> => cy.get('[data-testid=skip-button]');

/**
 * Get the Song Progress.
 *
 * @returns Chainable to Progress Paragraph Element.
 */
export const getSongProgress = (): Cypress.Chainable<JQuery<HTMLParagraphElement>> => getMediaControls()
  .get('p[data-testid=song-progress]');

/**
 * Get the Song Length.
 *
 * @returns Chainable to Length Paragraph Element.
 */
export const getSongLength = (): Cypress.Chainable<JQuery<HTMLParagraphElement>> => getMediaControls()
  .get('p[data-testid=song-length]');
