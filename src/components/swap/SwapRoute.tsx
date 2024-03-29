import { Trade as V2Trade } from '@p00ls/uniswap-v2-sdk'
import { Currency, Percent, TradeType } from '@uniswap/sdk-core'
import { AutoColumn } from 'components/Column'
import { LoadingRows } from 'components/Loader/styled'
import RoutingDiagram, { RoutingDiagramEntry } from 'components/RoutingDiagram/RoutingDiagram'
import { AutoRow, RowBetween } from 'components/Row'
import { memo } from 'react'
import styled from 'styled-components/macro'

import { FeeAmount } from '../../constants/feeAmount'
import { AutoRouterLabel, AutoRouterLogo } from './RouterLabel'

const Separator = styled.div`
  border-top: 1px solid ${({ theme }) => theme.bg2};
  height: 1px;
  width: 100%;
`

const V2_DEFAULT_FEE_TIER = FeeAmount.MEDIUM

export default memo(function SwapRoute({
  trade,
  syncing,
}: {
  trade: V2Trade<Currency, Currency, TradeType>
  syncing: boolean
}) {
  return (
    <AutoColumn gap="12px">
      <RowBetween>
        <AutoRow gap="4px" width="auto">
          <AutoRouterLogo />
          <AutoRouterLabel />
        </AutoRow>
        {syncing ? (
          <LoadingRows>
            <div style={{ width: '30px', height: '24px' }} />
          </LoadingRows>
        ) : null}
      </RowBetween>
      <Separator />
      {syncing ? (
        <LoadingRows>
          <div style={{ width: '400px', height: '30px' }} />
        </LoadingRows>
      ) : (
        <RoutingDiagram
          currencyIn={trade.inputAmount.currency}
          currencyOut={trade.outputAmount.currency}
          routes={getTokenPath(trade)}
        />
      )}
    </AutoColumn>
  )
})

function getTokenPath(trade: V2Trade<Currency, Currency, TradeType>): RoutingDiagramEntry[] {
  // convert V2 path to a list of routes
  const { path: tokenPath } = (trade as V2Trade<Currency, Currency, TradeType>).route
  const path = []
  for (let i = 1; i < tokenPath.length; i++) {
    path.push([tokenPath[i - 1], tokenPath[i], V2_DEFAULT_FEE_TIER] as RoutingDiagramEntry['path'][0])
  }
  return [{ percent: new Percent(100, 100), path }]
}
