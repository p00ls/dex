import { Trans } from '@lingui/macro'
import { Token } from '@uniswap/sdk-core'
import Badge, { BadgeVariant } from 'components/Badge'
import { transparentize } from 'polished'
import { Text } from 'rebass'
import styled from 'styled-components/macro'

import { useColor } from '../../hooks/useColor'
import { unwrappedToken } from '../../utils/unwrappedToken'
import { LightCard } from '../Card'
import { AutoColumn } from '../Column'
import DoubleCurrencyLogo from '../DoubleLogo'
import { AutoRow, RowFixed } from '../Row'
import { Dots } from '../swap/styleds'
import { FixedHeightRow } from '.'
import { CardNoise } from './styled'

const StyledPositionCard = styled(LightCard)<{ bgColor: any }>`
  border: none;
  background: ${({ theme, bgColor }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${transparentize(0.8, bgColor)} 0%, ${theme.bg3} 100%) `};
  position: relative;
  overflow: hidden;
`

interface PositionCardProps {
  tokenA: Token
  tokenB: Token
  liquidityToken: Token
  border?: string
}

export default function SushiPositionCard({ tokenA, tokenB, border }: PositionCardProps) {
  const currency0 = unwrappedToken(tokenA)
  const currency1 = unwrappedToken(tokenB)

  const backgroundColor = useColor(tokenA)

  return (
    <StyledPositionCard border={border} bgColor={backgroundColor}>
      <CardNoise />
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <AutoRow gap="8px">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            <Text fontWeight={500} fontSize={20}>
              {!currency0 || !currency1 ? (
                <Dots>
                  <Trans>Loading</Trans>
                </Dots>
              ) : (
                `${currency0.symbol}/${currency1.symbol}`
              )}
            </Text>

            <Badge variant={BadgeVariant.WARNING}>Sushi</Badge>
          </AutoRow>
          <RowFixed gap="8px"></RowFixed>
        </FixedHeightRow>
      </AutoColumn>
    </StyledPositionCard>
  )
}
