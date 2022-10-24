import { Trans } from '@lingui/macro'
import { ButtonSecondary } from 'components/Button'
import styled from 'styled-components/macro'

export interface AddressBlockedProps {
  address: string
  onDisconnectWallet: () => void
}

export const AddressBlockedModal = ({ address, onDisconnectWallet }: AddressBlockedProps) => {
  return (
    <Modal>
      <Title>
        <Trans>⚠️ Blocked Address</Trans>
      </Title>
      <div>
        <Trans>
          This address is blocked on app.zerozero.markets because it is associated with one or more blocked activities.
        </Trans>
      </div>
      <ButtonSecondary onClick={onDisconnectWallet}>
        <Trans>Disconnect Wallet</Trans>
      </ButtonSecondary>
    </Modal>
  )
}

const Modal = styled.div`
  padding: 1rem 1rem;

  & > * + * {
    margin-top: 1rem;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
`
