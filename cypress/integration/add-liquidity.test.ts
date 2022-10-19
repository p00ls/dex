import { aliasQuery } from '../utils/graphql-test-utils'

describe('Add Liquidity', () => {
  beforeEach(() => {
    cy.intercept('POST', '/subgraphs/name/uniswap/uniswap-v3', (req) => {
      aliasQuery(req, 'feeTierDistribution')
    })
  })

  it('loads the two correct tokens', () => {
    cy.visit('/add/v2/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d/0x677c9fe4396d3d13a0f9013a8118eae386c843a5')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', '00')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'IAM')
  })

  it('does not crash if 00 is duplicated', () => {
    cy.visit('/add/v2/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', '00')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('not.contain.text', '00')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/add/v2/0x677c9fe4396d3d13a0f9013a8118eae386c843a5/0xf63c65e855020e4b74f0ad842d9537da0e6162ec')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'IAM')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'ISH')
  })

  it('single token can be selected', () => {
    cy.visit('/add/v2/0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', '00')
    cy.visit('/add/v2/0x677c9fe4396d3d13a0f9013a8118eae386c843a5')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'IAM')
  })
})
