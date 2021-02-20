import * as selectors from '../support/app.po';

describe('Settings Dialog', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a dialog', () => {
    selectors.getSettingsDialog().should('not.exist');
    selectors.getSettingsButton().click();
    selectors.getSettingsDialog().should('exist');
  });

  it('should change language', () => {
    selectors.getLanguage().should('eq', 'en');

    selectors.getSettingsButton().click();
    selectors.getLanguageSelect().click()
      .get('mat-option')
      .contains('French')
      .click();
    selectors.getSaveSettingsButton().click();

    selectors.getLanguage().should('eq', 'fr');
  });

  it('should save settings between pages', () => {
    const settings = selectors.getSettings();

    cy.visit('/');

    Promise.all([
      settings,
      selectors.getSettings()
    ]).then(([s, newSettings]) => {
      expect(s).equal(newSettings);
    });
  });

  it('should get the latest settings from storage when reopening settings', () => {
    selectors.getLanguage().should('eq', 'en');
    selectors.getSettingsButton().click();
    selectors.getLanguageSelect().click()
      .get('mat-option')
      .contains('French')
      .click();
    selectors.getSaveSettingsButton().click();

    selectors.getSettingsButton().click();
    selectors.getLanguageSelect().should('have.text', 'French');
  });

  it('should cancel settings modal if the cancel button is pressed', () => {
    selectors.getLanguage().should('eq', 'en');
    selectors.getSettingsButton().click();
    selectors.getLanguageSelect().click()
      .get('mat-option')
      .contains('French')
      .click();
    selectors.getCancelSettingsButton().click();

    selectors.getSettingsButton().click();
    selectors.getLanguageSelect().should('have.text', 'English');
  });

  it('should display build time, commit hash and version', () => {
    selectors.getSettingsButton().click();

    selectors.getAppBuildTime()
      .should('match', /\w{3}, \d+ \w{3} \d{4} \d{2}:\d{2}:\d{2} \w{3}/u);
    selectors.getAppCommitHash()
      .should('match', /\w{7}/u);
    selectors.getAppVersion()
      .should('match', /\d+\.\d+\.\d+/u);
  });
});
