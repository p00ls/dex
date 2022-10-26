import { ACCEPTED_TERMS_OF_USE_COOKIE } from '../../src/components/TermsOfUse/constants'

describe('Pool', () => {
  beforeEach(() => {
    cy.setCookie(ACCEPTED_TERMS_OF_USE_COOKIE, '1')
    cy.visit('/pool/v2')
  })
  it('add liquidity links to /add/00', () => {
    cy.get('#join-pool-button').click()
    cy.url().should('contain', '/add/v2/00')
  })
})
