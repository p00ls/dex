import { Ether, Token } from '@uniswap/sdk-core'

import { SupportedChainId } from './chains'

export const LIQUIDITY_SYMBOL = 'P00LS-LP'
export const LIQUIDITY_NAME = 'P00LS LP'

export const ZEROZERO_SYMBOL = '00'
export const ZEROZERO_NAME = ZEROZERO_SYMBOL
export const ZEROZERO: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d',
    18,
    ZEROZERO_SYMBOL,
    ZEROZERO_NAME
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0x3fae7fc3361aea910dd5956fa7ba47f0c0231b7d',
    18,
    ZEROZERO_SYMBOL,
    ZEROZERO_NAME
  ),
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    '0xa6aad04cd9a55881b4d10878fe035004bb36fc60',
    18,
    ZEROZERO_SYMBOL,
    ZEROZERO_NAME
  ),
}

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.GOERLI]: new Token(
    SupportedChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]
    throw new Error('Unsupported chain ID')
  }

  private static _cachedEther: { [chainId: number]: ExtendedEther } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId))
  }
}
