import { useActiveWeb3React } from '../../hooks/web3'
import { SkipFirst } from '../../types/tuple'
import { useBlockNumber } from '../application/hooks'
import { multicall } from './instance'
export { NEVER_RELOAD } from '@uniswap/redux-multicall' // re-export for convenience

const {
  useMultipleContractSingleData: _useMultipleContractSingleData,
  useSingleCallResult: _useSingleCallResult,
  useSingleContractMultipleData: _useSingleContractMultipleData,
} = multicall.hooks

// Create wrappers for hooks so consumers don't need to get latest block themselves

type SkipFirstTwoParams<T extends (...args: any) => any> = SkipFirst<Parameters<T>, 2>

export function useMultipleContractSingleData(...args: SkipFirstTwoParams<typeof _useMultipleContractSingleData>) {
  const { chainId, latestBlock } = useCallContext()
  return _useMultipleContractSingleData(chainId, latestBlock, ...args)
}

export function useSingleCallResult(...args: SkipFirstTwoParams<typeof _useSingleCallResult>) {
  const { chainId, latestBlock } = useCallContext()
  return _useSingleCallResult(chainId, latestBlock, ...args)
}

export function useSingleContractMultipleData(...args: SkipFirstTwoParams<typeof _useSingleContractMultipleData>) {
  const { chainId, latestBlock } = useCallContext()
  return _useSingleContractMultipleData(chainId, latestBlock, ...args)
}

function useCallContext() {
  const { chainId } = useActiveWeb3React()
  const latestBlock = useBlockNumber()
  return { chainId, latestBlock }
}
