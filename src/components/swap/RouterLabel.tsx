import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'
import { ThemedText } from 'theme'

import { ReactComponent as StaticRouterIcon } from '../../assets/svg/static_route.svg'

const StyledStaticRouterIcon = styled(StaticRouterIcon)`
  height: 16px;
  width: 16px;

  fill: ${({ theme }) => theme.text3};

  :hover {
    filter: brightness(1.3);
  }
`

export function AutoRouterLogo() {
  return <StyledStaticRouterIcon />
}

export function AutoRouterLabel() {
  return (
    <ThemedText.Black fontSize={14}>
      <Trans>Trade Route</Trans>
    </ThemedText.Black>
  )
}
