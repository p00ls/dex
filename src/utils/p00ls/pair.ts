import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
import { Token } from '@uniswap/sdk-core'
import { solidityKeccak256 } from 'ethers/lib/utils'

function getInitCodeHash(implementation: string): string {
  const byteCode = [
    '0x3d602d80600a3d3981f3363d3d373d3d3d363d73',
    implementation.replace(/0x/, '').toLowerCase(),
    '5af43d82803e903d91602b57fd5bf3',
  ].join('')
  return solidityKeccak256(['bytes'], [byteCode])
}

export const computePairAddress = ({
  factoryAddress,
  templateAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string
  templateAddress: string
  tokenA: Token
  tokenB: Token
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    getInitCodeHash(templateAddress)
  )
}
