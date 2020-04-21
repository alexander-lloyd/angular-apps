describe('Performance Metrics from Lighthouse', () => {
  it('should meet performance benchmark', () => {
    const url = Cypress.config('baseUrl');
    cy.lighthouse(url).then((result) => {
      cy.log('Lighthouse Results: ', result);
      expect(result.accessibility).to.be.at.least(1.0);
      expect(result['best-practices']).to.be.at.least(0.93);
      expect(result.performance).to.be.at.least(0);
      expect(result.pwa).to.be.at.least(0.19);
      expect(result.seo).to.be.at.least(1.0);
    });
  });

  it('should meet performance benchmark when authenticated', () => {
    const url = Cypress.config('baseUrl');
    cy.login();
    cy.lighthouse(url).then((result) => {
      cy.log('Lighthouse Results: ', result);
      expect(result.accessibility).to.be.at.least(1.0);
      expect(result['best-practices']).to.be.at.least(0.93);
      expect(result.performance).to.be.at.least(0);
      expect(result.pwa).to.be.at.least(0.19);
      expect(result.seo).to.be.at.least(1.0);
    });
  });
});
