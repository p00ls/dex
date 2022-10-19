import { AbstractConnector } from '@web3-react/abstract-connector'

import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { injected, walletconnect, walletlink } from '../../connectors'
import Identicon from '../Identicon'

export default function StatusIcon({ connector }: { connector: AbstractConnector }) {
  switch (connector) {
    case injected:
      return <Identicon />
    case walletconnect:
      return <img src={WalletConnectIcon} alt={'WalletConnect'} />
    case walletlink:
      return <img src={CoinbaseWalletIcon} alt={'Coinbase Wallet'} />
    default:
      return null
  }
}
