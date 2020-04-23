import {
  getMediaControls,
  getPauseButton,
  getPlayButton,
  getPreviousButton,
  getSkipButton
} from '../support/media-control.po';

describe('media-control', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should have media player component', () => {
    cy.server();
    cy.route('GET', 'https://api.spotify.com/v1/me/player', '');
    cy.visit('/');
    getMediaControls().should('exist');
  });

  it('should play when play button is pressed', () => {
    cy.server({
      force404: true
    });
    cy.route('GET', 'https://api.spotify.com/v1/me/player', '');
    cy.route('PUT', 'https://api.spotify.com/v1/me/player/play', '');
    cy.visit('/');
    getPlayButton()
      .click()
      .then(() => {
        getPauseButton().should('exist');
      });
  });

  it('should pause when pause button is presses', () => {
    cy.server({
      force404: true
    });
    cy.route('GET', 'https://api.spotify.com/v1/me/player', '');
    cy.route('PUT', 'https://api.spotify.com/v1/me/player/play', '');
    cy.route('PUT', 'https://api.spotify.com/v1/me/player/pause', '');
    cy.visit('/');
    getPlayButton().click();
    getPauseButton().click();

    getPlayButton().should('exist');
  });

  it('should set playing state when response from spotify sets playstate', () => {
    cy.server({
      force404: true
    });
    cy.route('GET', 'https://api.spotify.com/v1/me/player', 'fixture:player.json');
    cy.visit('/');
    getPauseButton().should('exist');
  });

  it('should should go back when previous button is pressed', () => {
    cy.server({
      force404: true
    });
    cy.route('GET', 'https://api.spotify.com/v1/me/player', 'fixture:player.json');
    cy.route('GET', 'https://api.spotify.com/v1/me/player/previous', '');
    cy.visit('/');
    getPreviousButton()
      .should('exist')
      .click();
  });

  it('should should go next when skip button is pressed', () => {
    cy.server({
      force404: true
    });
    cy.route('GET', 'https://api.spotify.com/v1/me/player', 'fixture:player.json');
    cy.route('GET', 'https://api.spotify.com/v1/me/player/next', '');
    cy.visit('/');
    getSkipButton()
      .should('exist')
      .click();
  });
});
