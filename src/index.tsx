import '@reach/dialog/styles.css'
import 'inter-ui'
import 'polyfills'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { FirebaseProvider } from 'components/firebase'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { AnalyticsProvider } from './components/analytics/AnalyticsContext'
import Blocklist from './components/Blocklist'
import { TermsOfUse } from './components/TermsOfUse'
import { NetworkContextName } from './constants/misc'
import { LanguageProvider } from './i18n'
import App from './pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import LogsUpdater from './state/logs/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ThemeProvider, { ThemedGlobalStyle } from './theme'
import getLibrary from './utils/getLibrary'

const queryClient = new QueryClient()
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <LogsUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <Provider store={store}>
          <HashRouter>
            <LanguageProvider>
              <AnalyticsProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                  <Web3ProviderNetwork getLibrary={getLibrary}>
                    <Blocklist>
                      <TermsOfUse>
                        <Updaters />
                        <ThemeProvider>
                          <ThemedGlobalStyle />
                          <App />
                        </ThemeProvider>
                      </TermsOfUse>
                    </Blocklist>
                  </Web3ProviderNetwork>
                </Web3ReactProvider>
              </AnalyticsProvider>
            </LanguageProvider>
          </HashRouter>
        </Provider>
      </FirebaseProvider>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root')
)

if (process.env.REACT_APP_SERVICE_WORKER !== 'false') {
  serviceWorkerRegistration.register()
}
