import {getApp, getLoginButton, getLoadingSpinner} from '../support/app.po';

declare global {
  interface Window {
    ng: any;
  }
}

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

  it('should show a loading spinner when app is loading', () => {
    cy.window().then((window) => {
      getApp().then((app) => {
        const component = window.ng.getComponent(app[0]);
        component.loading$.next(true);
        window.ng.applyChanges(component);
      })
        .then(() => {
          getLoadingSpinner().should((t) => expect(t).not.eq(null));
        });
    });
  });
});
