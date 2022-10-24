import { useAddressAllowed } from 'hooks/useAddressAllowed'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { ReactNode } from 'react'

import { AddressBlockedModal } from './AddressBlockedModal'

export const AddressBlocked = ({ children }: { children: ReactNode }) => {
  const { account, deactivate } = useActiveWeb3React()
  const isAllowed = useAddressAllowed(account)

  if (account && !isAllowed) {
    return (
      <AppBody>
        <AddressBlockedModal address={account} onDisconnectWallet={deactivate} />
      </AppBody>
    )
  }

  return <>{children}</>
}
