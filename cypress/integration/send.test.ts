import { ACCEPTED_TERMS_OF_USE_COOKIE } from '../../src/components/TermsOfUse/constants'

describe('Send', () => {
  beforeEach(() => {
    cy.setCookie(ACCEPTED_TERMS_OF_USE_COOKIE, '1')
  })

  it('should redirect', () => {
    cy.visit('/send')
    cy.url().should('include', '/swap')
  })

  it('should redirect with url params', () => {
    cy.visit('/send?outputCurrency=ETH&recipient=bob.argent.xyz')
    cy.url().should('contain', '/swap?outputCurrency=ETH&recipient=bob.argent.xyz')
  })
})
