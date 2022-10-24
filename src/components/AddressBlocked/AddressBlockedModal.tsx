import { Trans } from '@lingui/macro'

export interface AddressBlockedProps {
  address: string
  onDisconnectWallet: () => void
}

export const AddressBlockedModal = ({ address, onDisconnectWallet }: AddressBlockedProps) => {
  return (
    <div>
      <div>
        <Trans>Blocked Address</Trans>
      </div>
      <div>
        <Trans>
          This address is blocked on app.zerozero.markets because it is associated with one or more blocked activities.
        </Trans>
      </div>
      <button onClick={onDisconnectWallet}>
        <Trans>Disconnect Wallet</Trans>
      </button>
    </div>
  )
}
