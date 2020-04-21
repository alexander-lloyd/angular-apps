import {
  getMediaControls,
  getPauseButton,
  getPlayButton
} from '../support/media-control.po';

describe('media-control', () => {
  beforeEach(() => {
    cy.login()
      .visit('/');
  });

  it('should have media player component', () => {
    getMediaControls().should((t) => expect(t).not.equal(null));
  });

  it('should play when play button is pressed', () => {
    cy.server();
    cy.route('PUT', 'https://api.spotify.com/v1/me/player/play', '');
    getPlayButton().click();

    getPauseButton().should((t) => expect(t).not.equal(null));
  });

  it('should pause when pause button is presses', () => {
    cy.server();
    cy.route('PUT', 'https://api.spotify.com/v1/me/player/play', '');
    cy.route('PUT', 'https://api.spotify.com/v1/me/player/pause', '');
    getPlayButton().click();
    getPauseButton().click();

    getPlayButton().should((t) => expect(t).not.equal(null));
  });
});
