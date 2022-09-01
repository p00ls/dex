describe('Pool', () => {
  beforeEach(() => cy.visit('/pool/v2'))
  it('add liquidity links to /add/ETH', () => {
    cy.get('#join-pool-button').click()
    cy.url().should('contain', '/add/v2/ETH')
  })
})
