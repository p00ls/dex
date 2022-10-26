import { ACCEPTED_TERMS_OF_USE_COOKIE } from '../../src/components/TermsOfUse/constants'

describe('Lists', () => {
  beforeEach(() => {
    cy.setCookie(ACCEPTED_TERMS_OF_USE_COOKIE, '1')
    cy.visit('/swap')
  })

  // @TODO check if default lists are active when we have them
  it('change list', () => {
    cy.get('#swap-currency-output .open-currency-select-button').click()
  })
})
