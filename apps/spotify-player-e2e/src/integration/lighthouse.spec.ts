describe('Performance Metrics from Lighthouse', () => {
  it('should meet performance benchmark', () => {
    const url = Cypress.config('baseUrl') as string;
    cy.lighthouse(url).then((result) => {
      cy.log('Lighthouse Results: ', result);
      cy.log('Lighthouse Accessibility Score', result.accessibility);
      cy.log('Lighthouse Best Practices Score', result['best-practices']);
      cy.log('Lighthouse Performance Score', result.performance);
      cy.log('Lighthouse PWA Score', result.pwa);
      cy.log('Lighthouse SEO Score', result.seo);
    });
  });

  it('should meet performance benchmark when authenticated', () => {
    const url = Cypress.config('baseUrl') as string;
    cy.login();
    cy.lighthouse(url).then((result) => {
      cy.log('Lighthouse Results: ', result);
      cy.log('Lighthouse Accessibility Score', result.accessibility);
      cy.log('Lighthouse Best Practices Score', result['best-practices']);
      cy.log('Lighthouse Performance Score', result.performance);
      cy.log('Lighthouse PWA Score', result.pwa);
      cy.log('Lighthouse SEO Score', result.seo);
    });
  });
});
