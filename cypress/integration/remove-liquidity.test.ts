import { ACCEPTED_TERMS_OF_USE_COOKIE } from '../../src/components/TermsOfUse/constants'

describe('Remove Liquidity', () => {
  beforeEach(() => {
    cy.setCookie(ACCEPTED_TERMS_OF_USE_COOKIE, '1')
  })
  it('00 remove', () => {
    cy.visit('/remove/v2/00/0x677c9fe4396d3d13a0f9013a8118eae386c843a5')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', '00')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'IAM')
  })

  it('00 remove swap order', () => {
    cy.visit('/remove/v2/0x677c9fe4396d3d13a0f9013a8118eae386c843a5/00')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'IAM')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', '00')
  })

  it('loads the two correct tokens', () => {
    cy.visit('/remove/v2/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d/0x677c9fe4396d3d13a0f9013a8118eae386c843a5')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', '00')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'IAM')
  })

  it('does not crash if 00 is duplicated', () => {
    cy.visit('/remove/v2/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', '00')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', '00')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/remove/v2/0x677c9fe4396d3d13a0f9013a8118eae386c843a5/0xf63c65e855020e4b74f0ad842d9537da0e6162ec')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'IAM')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'ISH')
  })
})
