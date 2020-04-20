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
  const currentTime = Date.now() * 1000;
  // The token was got 5 seconds ago
  const tokenStoredAt = currentTime - (5 * 1000);
  // The token expires in 1 hour.
  const tokenExpiry = currentTime + (60 * 60 * 1000);

  localStorage.setItem('access_token_stored_at', tokenStoredAt.toString());
  localStorage.setItem('nonce', 'nonce');
  localStorage.setItem('access_token', 'access token');
  localStorage.setItem('expires_at', tokenExpiry.toString());

  return this;
});
