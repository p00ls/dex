import { Trans } from '@lingui/macro'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useActiveWeb3React } from 'hooks/web3'
import { useRef } from 'react'
import { ChevronDown } from 'react-feather'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import styled from 'styled-components/macro'
import { MEDIA_WIDTHS } from 'theme'
import { switchToNetwork } from 'utils/switchToNetwork'

const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text2};
  font-weight: 400;
`
const FlyoutMenu = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  overflow: auto;
  padding: 16px;
  position: absolute;
  top: 64px;
  width: 272px;
  z-index: 99;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 50px;
  }
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg2 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`
const NetworkLabel = styled.div`
  flex: 1 1 auto;
`
const SelectorLabel = styled(NetworkLabel)`
  display: none;
  font-size: 14px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    margin-right: 8px;
  }
`
const SelectorControls = styled.div<{ interactive: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.bg1};
  border: 2px solid ${({ theme }) => theme.bg1};
  border-radius: 8px;
  color: ${({ theme }) => theme.text1};
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'auto')};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
`
const SelectorLogo = styled(Logo)<{ interactive?: boolean }>`
  margin-right: ${({ interactive }) => (interactive ? 8 : 0)}px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-right: 8px;
  }
`
const SelectorWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
  }
`
const StyledChevronDown = styled(ChevronDown)`
  width: 12px;
`

export default function NetworkSelector() {
  const { chainId, library } = useActiveWeb3React()
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR)
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR)
  useOnClickOutside(node, open ? toggle : undefined)

  const info = chainId ? CHAIN_INFO[chainId] : undefined

  const mainnetInfo = CHAIN_INFO[SupportedChainId.MAINNET]

  if (!chainId || !info || !library) {
    return null
  }

  function Row({ targetChain }: { targetChain: number }) {
    if (!library || !chainId) {
      return null
    }
    const handleRowClick = () => {
      switchToNetwork({ library, chainId: targetChain })
      toggle()
    }
    const active = chainId === targetChain
    const rowText = `${CHAIN_INFO[targetChain].label}`
    const RowContent = () => (
      <FlyoutRow onClick={handleRowClick} active={active}>
        <Logo src={CHAIN_INFO[targetChain].logoUrl} />
        <NetworkLabel>{rowText}</NetworkLabel>
        {chainId === targetChain && <FlyoutRowActiveIndicator />}
      </FlyoutRow>
    )
    return <RowContent />
  }

  return (
    <SelectorWrapper ref={node as any}>
      <SelectorControls onClick={toggle} interactive>
        <SelectorLogo interactive src={info.logoUrl || mainnetInfo.logoUrl} />
        <SelectorLabel>{info.label}</SelectorLabel>
        <StyledChevronDown />
      </SelectorControls>
      {open && (
        <FlyoutMenu>
          <FlyoutHeader>
            <Trans>Select a network</Trans>
          </FlyoutHeader>
          <Row targetChain={SupportedChainId.MAINNET} />
        </FlyoutMenu>
      )}
    </SelectorWrapper>
  )
}
