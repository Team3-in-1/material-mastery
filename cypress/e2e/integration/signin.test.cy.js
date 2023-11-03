it('UTCID01', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('0')
  cy.get('#signin-form-password-input').type('Allksdlk')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID02', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('092932985554')
  cy.get('#signin-form-password-input').type('Allksdlkhj')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID03', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('a09230123')
  cy.get('#signin-form-password-input').type('AleckAleckAleckAleckAleckAleck')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID04', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('349583495$')
  cy.get('#signin-form-password-input').type('Allksdlkhj')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID05', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298')
  cy.get('#signin-form-password-input').type('A')

  cy.get('#signin-form-btn').click()
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('have.text', 'Password must have at least 8 characters')
})
it('UTCID06', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('0929329855')
  cy.get('#signin-form-password-input').type('AleckAleckAleckAleckAleckAleck1')

  cy.get('#signin-form-btn').click()
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('have.text', 'Password must not exceed 30 characters')
})
it('UTCID07', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298')
  cy.get('#signin-form-password-input').type('Allksdlk')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID08', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298')
  cy.get('#signin-form-password-input').type('Allksdlkhj')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID09', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298')
  cy.get('#signin-form-password-input').type('AleckAleckAleckAleckAleckAleck')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID010', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('0929329855')
  cy.get('#signin-form-password-input').type('Allksdlk')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID11', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('0929329855')
  cy.get('#signin-form-password-input').type('Allksdlkhj')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID12', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('0929329855')
  cy.get('#signin-form-password-input').type('AleckAleckAleckAleckAleckAleck')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID13', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298555')
  cy.get('#signin-form-password-input').type('Allksdlk')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID14', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298555')
  cy.get('#signin-form-password-input').type('Allksdlkhj')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID15', () => {

  cy.visit('http://localhost:3000/sign-in')
  cy.get('#signin-form-phone-input').type('09293298555')
  cy.get('#signin-form-password-input').type('AleckAleckAleckAleckAleckAleck')

  cy.get('#signin-form-btn').click()
  cy.get('div:has(> input#signin-form-phone-input) + p').should('not.exist')
  cy.get('input#signin-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})