describe('heading text', () => {
  it('contains the correct title', () => {
    cy.visit('http://127.0.0.1:8080/login.html');
    cy.get('h1').contains('ARTFRIENDER');
  });
});
