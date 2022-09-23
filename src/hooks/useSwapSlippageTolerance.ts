import { Trade as V2Trade } from '@p00ls/uniswap-v2-sdk'
import { Currency, CurrencyAmount, Percent, TradeType } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import { useMemo } from 'react'

import { useUserSlippageToleranceWithDefault } from '../state/user/hooks'
import { useCurrency } from './Tokens'
import useGasPrice from './useGasPrice'
import useUSDCPrice, { useUSDCValue } from './useUSDCPrice'

const V2_SWAP_DEFAULT_SLIPPAGE = new Percent(50, 10_000) // .50%
const ONE_TENTHS_PERCENT = new Percent(10, 10_000) // .10%

/**
 * Return a guess of the gas cost used in computing slippage tolerance for a given trade
 * @param trade the trade for which to _guess_ the amount of gas it would cost to execute
 */
function guesstimateGas(trade: V2Trade<Currency, Currency, TradeType> | undefined): number | undefined {
  if (trade instanceof V2Trade) {
    return 90_000 + trade.route.pairs.length * 30_000
  }
  return undefined
}

const MIN_AUTO_SLIPPAGE_TOLERANCE = new Percent(5, 1000) // 0.5%
const MAX_AUTO_SLIPPAGE_TOLERANCE = new Percent(25, 100) // 25%

export default function useSwapSlippageTolerance(trade: V2Trade<Currency, Currency, TradeType> | undefined): Percent {
  const outputDollarValue = useUSDCValue(trade?.outputAmount)
  const ethGasPrice = useGasPrice()

  const gasEstimate = guesstimateGas(trade)
  const ether = useCurrency('ETH')
  const etherPrice = useUSDCPrice(ether ?? undefined)

  const defaultSlippageTolerance = useMemo(() => {
    if (!trade) return ONE_TENTHS_PERCENT

    const ethGasCost =
      ethGasPrice && typeof gasEstimate === 'number' ? JSBI.multiply(ethGasPrice, JSBI.BigInt(gasEstimate)) : undefined
    const dollarGasCost =
      ether && ethGasCost && etherPrice ? etherPrice.quote(CurrencyAmount.fromRawAmount(ether, ethGasCost)) : undefined

    if (outputDollarValue && dollarGasCost) {
      // the rationale is that a user will not want their trade to fail for a loss due to slippage that is less than
      // the cost of the gas of the failed transaction
      const fraction = dollarGasCost.asFraction.divide(outputDollarValue.asFraction)
      const result = new Percent(fraction.numerator, fraction.denominator)
      if (result.greaterThan(MAX_AUTO_SLIPPAGE_TOLERANCE)) return MAX_AUTO_SLIPPAGE_TOLERANCE
      if (result.lessThan(MIN_AUTO_SLIPPAGE_TOLERANCE)) return MIN_AUTO_SLIPPAGE_TOLERANCE
      return result
    }

    return V2_SWAP_DEFAULT_SLIPPAGE
  }, [ethGasPrice, ether, etherPrice, gasEstimate, outputDollarValue, trade])

  return useUserSlippageToleranceWithDefault(defaultSlippageTolerance)
}
