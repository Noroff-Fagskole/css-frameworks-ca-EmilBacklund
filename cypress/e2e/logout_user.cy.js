describe('test logout button and that localstorage is cleared after', () => {
  it('log in user', () => {
    cy.visit('http://127.0.0.1:8080/login.html');
    cy.get('#loginEmail').type('emil@noroff.no');
    cy.get('#loginPassword').type('m4mm4123');
    cy.get('button')
      .contains('Log In')
      .click();
  });
  it('check if localStorage contains value', () => {
    cy.get('#logOutBtn').should(() => {
      expect(localStorage.getItem('user')).to.be.a('string');
    });
  });
  it('press logout button', () => {
    const logOutPc = cy.get('#logOutBtn');
    const logOutMobile = cy.get('#logOutBtnMobile');

    if (logOutPc.should('be.visible')) {
      logOutPc.click();
    } else if (logOutMobile.should('be.visible')) {
      logOutMobile.click();
    }
  });
  it('check if localStorage is cleared', () => {
    cy.get('button')
      .contains('Log In')
      .should(() => {
        expect(localStorage.getItem('user')).to.be.null;
      });
  });
});
