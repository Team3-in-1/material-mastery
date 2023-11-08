it('UTCID01', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('A')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('have.text', 'Name must have at least 2 letters')
})
it('UTCID02', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck1')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('have.text', 'Name must not exceed 30 characters')
})
it('UTCID03', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID04', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('092932985554')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID05', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('a09230123')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID06', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('349583495$')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-phone-input) + p').should('have.text', 'Invalid phone')
})
it('UTCID07', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298555')
    cy.get('#signup-form-email-input').type('a')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-email-input) + p').should('have.text', 'Invalid email')
})
it('UTCID08', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc1@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-email-input) + p').should('have.text', 'Invalid email')
})
it('UTCID09', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('examplegmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-email-input) + p').should('have.text', 'Invalid email')
})
it('UTCID010', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmailcom')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-email-input) + p').should('have.text', 'Invalid email')
})
it('UTCID11', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298555')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('A')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('have.text', 'Password must have at least 8 characters')
})
it('UTCID12', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck1')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('have.text', 'Password must not exceed 30 characters')
})
it('UTCID13', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-term-cbx) + div > p').should('have.text', 'Not accept term of service')
})
it('UTCID14', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID15', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID16', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID17', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID18', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID19', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID20', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID21', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID22', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID23', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID24', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID25', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Al')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID26', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID27', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID28', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID29', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID30', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID31', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID32', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID33', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID34', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID35', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID36', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID37', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('Aleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID38', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID39', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID40', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID41', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID42', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID43', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('09293298')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID44', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID45', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID46', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('a@g.co')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID47', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlk')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID48', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('Allksdlkhj')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})
it('UTCID49', () => {

    cy.visit('http://localhost:3000/sign-up')
    cy.get('#signup-form-name-input').type('AleckAleckAleckAleckAleckAleck')
    cy.get('#signup-form-phone-input').type('0929329855')
    cy.get('#signup-form-email-input').type('example@gmail.com')
    cy.get('#signup-form-password-input').type('AleckAleckAleckAleckAleckAleck')

    cy.get('#signup-form-term-cbx').check()
    cy.get('#signup-form-btn').click()
    cy.get('div:has(> input#signup-form-name-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-phone-input) + p').should('not.exist')
    cy.get('div:has(> input#signup-form-email-input) + p').should('not.exist')
    cy.get('input#signup-form-password-input').parent('div').parent('div').next('p').should('not.exist')
})