import { TransactionType } from '../../state/transactions/actions'

export enum AnalyticsEventsType {
  WALLET_CONNECTED = 'wallet_connected',
  WALLET_SELECTED = 'wallet_selected',
  TRANSACTION = 'transaction',
}

export interface WalletConnectedEvent {
  type: AnalyticsEventsType.WALLET_CONNECTED
}

export interface WalletSelectedEvent {
  type: AnalyticsEventsType.WALLET_SELECTED
}

export interface TransactionEvent {
  type: AnalyticsEventsType.TRANSACTION
  transactionType: TransactionType
}

export type AnalyticsEvent = WalletConnectedEvent | WalletSelectedEvent | TransactionEvent

export function getEventName(event: AnalyticsEvent): string {
  switch (event.type) {
    case AnalyticsEventsType.TRANSACTION:
      return TransactionType[event.transactionType]
    case AnalyticsEventsType.WALLET_CONNECTED:
    case AnalyticsEventsType.WALLET_SELECTED:
      return event.type
  }
}
