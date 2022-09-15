import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

// export const MULTICALL_ADDRESS: AddressMap = {
//   [SupportedChainId.MAINNET]: '0xb794f5ea0ba39494ce839613fffba74279579268',
//   [SupportedChainId.RINKEBY]: '0xb794f5ea0ba39494ce839613fffba74279579268',
//   [SupportedChainId.GOERLI]: '0xb794f5ea0ba39494ce839613fffba74279579268',
// }
export const MULTICALL_ADDRESS: AddressMap = constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [])

export const V2_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xb794f5ea0ba39494ce839613fffba74279579268',
  [SupportedChainId.RINKEBY]: '0x2D1bA0082A97321e736eA091D7d5D1d48952c27C',
  [SupportedChainId.GOERLI]: '0xb794f5ea0ba39494ce839613fffba74279579268',
}
export const V2_ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xb794f5ea0ba39494ce839613fffba74279579268',
  [SupportedChainId.RINKEBY]: '0x94CE7aC80062434228Cb0cD3Ad30c0f21F5FC769',
  [SupportedChainId.GOERLI]: '0xb794f5ea0ba39494ce839613fffba74279579268',
}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
