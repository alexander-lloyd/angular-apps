import {getGreeting} from '../support/app.po';

describe('favourite', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Bookmarks');
  });
});
