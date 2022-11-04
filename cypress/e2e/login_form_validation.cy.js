describe('test validation on form login page', () => {
  it('test correct validation message', () => {
    cy.visit('http://127.0.0.1:8080/login.html');
    cy.get('#loginEmail')
      .type('bert@norofff.no')
      .wait(1000);
    cy.get('#loginPassword')
      .type('hello')
      .wait(1000);
    cy.get('button')
      .contains('Log In')
      .click()
      .wait(1000);
    cy.get('#loginEmailErrorNotValid')
      .contains('Must be stud.noroff.no or noroff.no email address')
      .wait(1000);
    cy.get('#loginPasswordError')
      .contains('Password must be over 8 chars')
      .wait(1000);
    cy.get('#loginEmail')
      .clear()
      .wait(1000);
    cy.get('#loginPassword')
      .clear()
      .wait(1000);
    cy.get('button')
      .contains('Log In')
      .click()
      .wait(1000);
    cy.get('#loginEmailError')
      .contains('Email is required')
      .wait(1000);
  });
});
