import { Currency, Percent, Token } from '@uniswap/sdk-core'
import { FeeAmount } from 'constants/feeAmount'
import { render } from 'test-utils'

import { SupportedChainId } from '../../constants/chains'
import RoutingDiagram, { RoutingDiagramEntry } from './RoutingDiagram'

const percent = (strings: TemplateStringsArray) => new Percent(parseInt(strings[0]), 100)

const USDC = new Token(SupportedChainId.MAINNET, '0x881ba05de1e78f549cc63a8f6cabb1d4ad32250d', 18, 'USDC', 'USDC')
const DAI = new Token(SupportedChainId.MAINNET, '0x4346cd535056593f184f655025cdb536b35b662f', 18, 'DAI', 'DAI')
const WBTC = new Token(SupportedChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'WBTC', 'WBTC')

const singleRoute: RoutingDiagramEntry = { percent: percent`100`, path: [[USDC, DAI, FeeAmount.LOW]] }

const multiRoute: RoutingDiagramEntry[] = [
  { percent: percent`75`, path: [[USDC, DAI, FeeAmount.LOWEST]] },
  {
    percent: percent`25`,
    path: [
      [USDC, WBTC, FeeAmount.MEDIUM],
      [WBTC, DAI, FeeAmount.HIGH],
    ],
  },
]

jest.mock(
  'components/CurrencyLogo',
  () =>
    ({ currency }: { currency: Currency }) =>
      `CurrencyLogo currency=${currency.symbol}`
)

jest.mock(
  'components/DoubleLogo',
  () =>
    ({ currency0, currency1 }: { currency0: Currency; currency1: Currency }) =>
      `DoubleCurrencyLogo currency0=${currency0.symbol} currency1=${currency1.symbol}`
)

jest.mock('../Popover', () => () => 'Popover')

jest.mock('hooks/useTokenInfoFromActiveList', () => ({
  useTokenInfoFromActiveList: (currency: Currency) => currency,
}))

it('renders when no routes are provided', () => {
  const { asFragment } = render(<RoutingDiagram currencyIn={DAI} currencyOut={USDC} routes={[]} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders single route', () => {
  const { asFragment } = render(<RoutingDiagram currencyIn={USDC} currencyOut={DAI} routes={[singleRoute]} />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders multi route', () => {
  const { asFragment } = render(<RoutingDiagram currencyIn={USDC} currencyOut={DAI} routes={multiRoute} />)
  expect(asFragment()).toMatchSnapshot()
})
