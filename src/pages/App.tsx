import { AddressBlocked } from 'components/AddressBlocked'
import Loader from 'components/Loader'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'

import AnalyticsReporter from '../components/analytics/AnalyticsReporter'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import PoolV2 from './Pool/v2'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6rem 16px 16px 16px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <ErrorBoundary>
      <Route component={AnalyticsReporter} />
      <Route component={ApeModeQueryParamReader} />
      <Web3ReactManager>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <AddressBlocked>
              <Popups />
              <Polling />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/swap" component={Swap} />

                  <Route exact strict path="/pool/v2/find" component={PoolFinder} />
                  <Route exact strict path="/pool/v2" component={PoolV2} />

                  <Route
                    exact
                    strict
                    path="/add/v2/:currencyIdA?/:currencyIdB?"
                    component={RedirectDuplicateTokenIdsV2}
                  />

                  <Route exact strict path="/remove/v2/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                  <Route component={RedirectPathToSwapOnly} />
                </Switch>
              </Suspense>
              <Marginer />
            </AddressBlocked>
          </BodyWrapper>
        </AppWrapper>
      </Web3ReactManager>
    </ErrorBoundary>
  )
}
