describe('terms of use', () => {
  it('should show terms of use', () => {
    cy.visit('/')
    cy.get('body').should('contain', 'Accept Terms of Use')
  })

  it('validate terms of use', () => {
    cy.visit('/')
    cy.get('input[type=checkbox]').click()
    cy.get('button').click()
    cy.url().should('include', '/swap')
  })
})
