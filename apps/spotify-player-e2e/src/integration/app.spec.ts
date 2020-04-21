import {getApp, getLoginButton} from '../support/app.po';

describe('spotify-player', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app', () => {
    getApp().should((t) => expect(t).not.equal(null));
  });

  it('should get redirected to spotify login page when login button is pressed', () => {
    getLoginButton().click()
      .then(() => cy.location().should((location) => {
        expect(location.host).eq('accounts.spotify.com');
      }));
  });
});
