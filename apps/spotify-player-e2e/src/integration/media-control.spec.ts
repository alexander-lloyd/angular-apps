import {getMediaControls} from '../support/media-control.po';

describe('media-control', () => {
  beforeEach(() => {
    cy.login()
      .visit('/');
  });

  it('should have media player component', () => {
    getMediaControls().should((t) => expect(t).not.equal(null));
  });
});
