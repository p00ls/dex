import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { TransactionInfo, TransactionType } from 'state/transactions/actions'

import { AnalyticsEvent, AnalyticsEventsType } from '../components/analytics/events'
import { useAnalytics } from '../components/analytics/hooks/useAnalytics'
import { useActiveWeb3React } from './web3'

type PartialTransactionResponse = Pick<TransactionResponse, 'hash' | 'v' | 'r' | 's'>

const SUPPORTED_TRANSACTION_TYPES = [
  TransactionType.ADD_LIQUIDITY_V2_POOL,
  TransactionType.REMOVE_LIQUIDITY,
  TransactionType.SWAP,
]

function useMonitoringEventCallback() {
  const { chainId } = useActiveWeb3React()
  const analytics = useAnalytics()

  return useCallback(
    async function log(
      type: AnalyticsEvent,
      {
        transactionResponse,
        walletAddress,
      }: { transactionResponse: PartialTransactionResponse; walletAddress: string | undefined }
    ) {
      if (!walletAddress) {
        console.debug('Wallet address required to log monitoring events.')
        return
      }
      try {
        await analytics.trackEvent(type, {
          chainId,
          origin: window.location.origin,
          timestamp: Date.now(),
          tx: transactionResponse,
          walletAddress,
        })
      } catch (e) {
        console.debug('Error adding document: ', e)
      }
    },
    [analytics, chainId]
  )
}

export function useTransactionMonitoringEventCallback() {
  const { account } = useActiveWeb3React()
  const log = useMonitoringEventCallback()

  return useCallback(
    (info: TransactionInfo, transactionResponse: TransactionResponse) => {
      if (SUPPORTED_TRANSACTION_TYPES.includes(info.type)) {
        log(
          { type: AnalyticsEventsType.TRANSACTION, transactionType: info.type },
          {
            transactionResponse: (({ hash, v, r, s }: PartialTransactionResponse) => ({ hash, v, r, s }))(
              transactionResponse
            ),
            walletAddress: account ?? undefined,
          }
        )
      }
    },
    [account, log]
  )
}

export function useWalletConnectMonitoringEventCallback() {
  const log = useMonitoringEventCallback()

  return useCallback(
    (walletAddress) => {
      log(
        { type: AnalyticsEventsType.WALLET_CONNECTED },
        { transactionResponse: { hash: '', r: '', s: '', v: -1 }, walletAddress }
      )
    },
    [log]
  )
}
