describe('test to write a post and submitt it and see if it was created correctly', () => {
  it('log in', () => {
    cy.visit('http://127.0.0.1:8080/login.html');
    cy.get('#loginEmail').type('emil@noroff.no');
    cy.get('#loginPassword').type('m4mm4123');
    cy.get('button')
      .contains('Log In')
      .click();
  });
  it('write a post and submitt', () => {
    cy.get('#postBody').type('I am the cypress test');
    cy.get('button')
      .contains('Share')
      .click()
      .wait(2000);
  });
  it('check if the post was created', () => {
    cy.get('[data-cy="rakira"]').contains('I am the cypress test');
  });
});
