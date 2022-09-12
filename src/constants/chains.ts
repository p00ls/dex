import ethereumLogoUrl from 'assets/images/ethereum-logo.png'

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
] as const

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
  readonly logoUrl?: string
  readonly rpcUrls?: string[]
  readonly nativeCurrency: {
    name: string // 'Goerli ETH',
    symbol: string // 'gorETH',
    decimals: number //18,
  }
}

export type ChainInfo = { readonly [chainId: number]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Rinkeby',
    nativeCurrency: { name: 'Rinkeby ETH', symbol: 'rinkETH', decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://ropsten.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ropsten',
    nativeCurrency: { name: 'Ropsten ETH', symbol: 'ropETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    nativeCurrency: { name: 'Görli ETH', symbol: 'görETH', decimals: 18 },
  },
}
