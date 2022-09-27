// a list of tokens by chain
import { Currency, Token } from '@uniswap/sdk-core'

import { SupportedChainId } from './chains'
import { ZEROZERO } from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [SupportedChainId.MAINNET]: [ZEROZERO[SupportedChainId.MAINNET]],
  [SupportedChainId.RINKEBY]: [ZEROZERO[SupportedChainId.RINKEBY]],
  [SupportedChainId.GOERLI]: [ZEROZERO[SupportedChainId.GOERLI]],
}
export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {}
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.MAINNET]: [ZEROZERO[SupportedChainId.MAINNET]],
  [SupportedChainId.RINKEBY]: [ZEROZERO[SupportedChainId.RINKEBY]],
  [SupportedChainId.GOERLI]: [ZEROZERO[SupportedChainId.GOERLI]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {}
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {}
