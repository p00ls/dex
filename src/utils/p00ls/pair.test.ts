import { Token } from '@uniswap/sdk-core'

import { SupportedChainId } from '../../constants/chains'
import { computePairAddress } from './pair'

describe('compute pair address', () => {
  it('does nothing to non-urls', () => {
    const factoryAddress = '0x4Eb4445EBc238080307A576Cee6B82baf39D5658'
    const templateAddress = '0x2EC05dbD2e7d6Ee00FAfB3045EaE880F10796f1D'
    const tokenA = new Token(SupportedChainId.GOERLI, '0xa6aad04cd9a55881b4d10878fe035004bb36fc60', 18, '00', '00')
    const tokenB = new Token(SupportedChainId.GOERLI, '0xd6c0071b16183c4aa3316616e7b1ca6fc4468855', 18, 'IAM', 'IAM')

    const pairAddress = computePairAddress({ factoryAddress, templateAddress, tokenA, tokenB })

    expect(pairAddress).toEqual('0x23856cCDce686B65fF25e0c84D266aBf3E74693F')
  })
})
