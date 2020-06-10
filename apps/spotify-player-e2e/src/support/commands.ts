/* eslint-disable @typescript-eslint/no-namespace */
/* eslint no-magic-numbers: ["error", { "ignore": [5, 60, 1000] }] */

/*
 * This example commands.js shows you how to
 * Create various custom commands and overwrite
 * Existing commands.
 *
 * For more comprehensive examples of custom
 * Commands please read more here:
 * https://on.cypress.io/custom-commands
 */
declare namespace Cypress {
  interface Chainable<Subject> {
    login(): Chainable<Subject>;
  }
}

Cypress.Commands.add('login', () => {
  const MILLISECONDS_TO_NANOSECONDS = 1000;
  const FIVE_SECONDS = 5000;
  const ONE_HOUR = 3600000;

  const currentTime = Date.now() * MILLISECONDS_TO_NANOSECONDS;
  // The token was got 5 seconds ago
  const tokenStoredAt = currentTime - FIVE_SECONDS;
  // The token expires in 1 hour.
  const tokenExpiry = currentTime + ONE_HOUR;

  localStorage.setItem('access_token_stored_at', tokenStoredAt.toString());
  localStorage.setItem('nonce', 'nonce');
  localStorage.setItem('access_token', 'access token');
  localStorage.setItem('expires_at', tokenExpiry.toString());

  return this;
});
