describe('mobile', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
  });

  require('./app.spec');
  require('./settings.spec');
});
