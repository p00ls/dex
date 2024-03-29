import { Interface } from '@ethersproject/abi'
import { BigintIsh, Currency, CurrencyAmount } from '@uniswap/sdk-core'
import JSBI from 'jsbi'

import { Erc20Interface } from '../abis/types/Erc20'

const ERC20_INTERFACE = new Interface([
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]) as Erc20Interface

/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
function toHex(bigintIsh: BigintIsh) {
  const bigInt = JSBI.BigInt(bigintIsh)
  let hex = bigInt.toString(16)
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`
  }
  return `0x${hex}`
}

export default function approveAmountCalldata(
  amount: CurrencyAmount<Currency>,
  spender: string
): { to: string; data: string; value: '0x0' } {
  if (!amount.currency.isToken) throw new Error('Must call with an amount of token')
  const approveData = ERC20_INTERFACE.encodeFunctionData('approve', [spender, toHex(amount.quotient)])
  return {
    to: amount.currency.address,
    data: approveData,
    value: '0x0',
  }
}
