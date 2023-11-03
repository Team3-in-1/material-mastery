describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/sign-in')
    cy.get('#signin-form-phone-input').type("1234567")
    cy.get('#signin-form-password-input').type("123")
    cy.get('#signin-form-btn').click()
    cy.get('div:has(> input#signin-form-phone-input) + p').should('have.text', 'Phone must have at least 8 letters')
  })
})