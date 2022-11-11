describe('test validation on form login page', () => {
  it('test wrong validation message', () => {
    cy.visit('http://127.0.0.1:8080/login.html');
    cy.get('#loginEmail').type('bert@norofff.no');
    cy.get('#loginPassword').type('hello');
    cy.get('button')
      .contains('Log In')
      .click();
    cy.get('#loginEmailErrorNotValid').contains(
      'Must be stud.noroff.no or noroff.no email address',
    );
    cy.get('#loginPasswordError').contains('Password must be over 8 chars');
    cy.get('#loginEmail').clear();
    cy.get('#loginPassword').clear();
    cy.get('button')
      .contains('Log In')
      .click();
    cy.get('#loginEmailError').contains('Email is required');
  });
  it('test correct validation', () => {
    cy.get('#loginEmail').type('emil@noroff.no');
    cy.get('#loginPassword').type('m4mm4123');
    cy.get('button')
      .contains('Log In')
      .click()
      .wait(1000);
  });
  it('see if I am on homepage', () => {
    cy.url().should('include', '/index.html');
  });
});
