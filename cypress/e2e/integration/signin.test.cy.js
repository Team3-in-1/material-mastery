describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/sign-in')
    cy.get('#signin-form-phone-input').type("1234567")
    cy.get('#signin-form-password-input').type("123")
  })
})