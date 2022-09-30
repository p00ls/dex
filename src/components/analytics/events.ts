import { TransactionType } from '../../state/transactions/actions'

export enum AnalyticsEventsType {
  WALLET_CONNECTED = 'wallet_connected',
  TRANSACTION = 'transaction',
}

export interface WalletConnectedEvent {
  type: AnalyticsEventsType.WALLET_CONNECTED
}

export interface TransactionEvent {
  type: AnalyticsEventsType.TRANSACTION
  transactionType: TransactionType
}

export type AnalyticsEvent = WalletConnectedEvent | TransactionEvent

export function getEventName(event: AnalyticsEvent): string {
  switch (event.type) {
    case AnalyticsEventsType.WALLET_CONNECTED:
      return AnalyticsEventsType.WALLET_CONNECTED
    case AnalyticsEventsType.TRANSACTION:
      return TransactionType[event.transactionType]
  }
}
