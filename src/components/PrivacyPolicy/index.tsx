import { Trans } from '@lingui/macro'
import Card, { DarkGreyCard } from 'components/Card'
import { AutoRow, RowBetween } from 'components/Row'
import { useRef } from 'react'
import { ArrowDown, Info, X } from 'react-feather'
import styled from 'styled-components/macro'
import { ExternalLink, ThemedText } from 'theme'
import { isMobile } from 'utils/userAgent'

import { useModalOpen, useTogglePrivacyPolicy } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/reducer'
import { AutoColumn } from '../Column'
import Modal from '../Modal'

const Wrapper = styled.div`
  max-height: 70vh;
  overflow: auto;
  padding: 0 1rem;
`

const StyledExternalCard = styled(Card)`
  background-color: ${({ theme }) => theme.primary5};
  padding: 0.5rem;
  width: 100%;

  :hover,
  :focus,
  :active {
    background-color: ${({ theme }) => theme.primary4};
  }
`

const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`

const StyledLinkOut = styled(ArrowDown)`
  transform: rotate(230deg);
`

const EXTERNAL_APIS = [
  {
    name: 'Infura',
    description: <Trans>The app fetches on-chain data and constructs contract calls with an Infura API.</Trans>,
  },
  {
    name: 'Chainalysis',
    description: (
      <>
        <Trans>
          The app securely collects your wallet address and shares it with Chainalysis Inc. for risk and compliance
          reasons.
        </Trans>{' '}
      </>
    ),
  },
  {
    name: 'Segment.io',
    description: <Trans>The app logs anonymized usage statistics in order to improve over time.</Trans>,
  },
  {
    name: 'The Graph',
    description: <Trans>The app fetches blockchain data from The Graph’s hosted service.</Trans>,
  },
]

export function PrivacyPolicyModal() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.PRIVACY_POLICY)
  const toggle = useTogglePrivacyPolicy()

  return (
    <Modal isOpen={open} onDismiss={() => toggle()}>
      <AutoColumn gap="12px" ref={node as any}>
        <RowBetween padding="1rem 1rem 0.5rem 1rem">
          <ThemedText.MediumHeader>
            <Trans>Legal & Privacy</Trans>
          </ThemedText.MediumHeader>
          <HoverText onClick={() => toggle()}>
            <X size={24} />
          </HoverText>
        </RowBetween>
        <PrivacyPolicy />
      </AutoColumn>
    </Modal>
  )
}

export function PrivacyPolicy() {
  return (
    <Wrapper
      draggable="true"
      onTouchMove={(e) => {
        // prevent modal gesture handler from dismissing modal when content is scrolling
        if (isMobile) {
          e.stopPropagation()
        }
      }}
    >
      <AutoColumn gap="16px">
        <AutoColumn gap="8px" style={{ width: '100%' }}>
          <StyledExternalCard>
            <ExternalLink href={'https://app.zerozero.markets/ZZ Liquidity - Website Terms of Use.pdf'}>
              <RowBetween>
                <AutoRow gap="4px">
                  <Info size={20} />
                  <ThemedText.Main fontSize={14} color={'primaryText1'}>
                    <Trans>ZZ Liquidity Inc. Terms of Service</Trans>
                  </ThemedText.Main>
                </AutoRow>
                <StyledLinkOut size={20} />
              </RowBetween>
            </ExternalLink>
          </StyledExternalCard>
        </AutoColumn>
        <AutoColumn gap="8px" style={{ width: '100%' }}>
          <StyledExternalCard>
            <ExternalLink href={'https://app.zerozero.markets/ZZ Liquidity Privacy Policy.pdf'}>
              <RowBetween>
                <AutoRow gap="4px">
                  <Info size={20} />
                  <ThemedText.Main fontSize={14} color={'primaryText1'}>
                    <Trans>ZZ Liquidity Inc. Privacy Policy</Trans>
                  </ThemedText.Main>
                </AutoRow>
                <StyledLinkOut size={20} />
              </RowBetween>
            </ExternalLink>
          </StyledExternalCard>
        </AutoColumn>
        <ThemedText.Main fontSize={14}>
          <Trans>This app uses the following third-party APIs:</Trans>
        </ThemedText.Main>
        <AutoColumn gap="12px">
          {EXTERNAL_APIS.map(({ name, description }, i) => (
            <DarkGreyCard key={i}>
              <AutoColumn gap="8px">
                <AutoRow gap="4px">
                  <Info size={18} />
                  <ThemedText.Main fontSize={14} color={'text1'}>
                    {name}
                  </ThemedText.Main>
                </AutoRow>
                <ThemedText.Main fontSize={14}>{description}</ThemedText.Main>
              </AutoColumn>
            </DarkGreyCard>
          ))}
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  )
}
