import { Trans } from '@lingui/macro'
import React, { ErrorInfo } from 'react'
import styled from 'styled-components/macro'

import { ExternalLink, ThemedText } from '../../theme'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

const FallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  z-index: 1;
`

const BodyWrapper = styled.div<{ margin?: string }>`
  padding: 1rem;
  width: 100%;
`

const CodeBlockWrapper = styled.div`
  background: ${({ theme }) => theme.bg0};
  overflow: auto;
  white-space: pre;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  padding: 18px 24px;
  color: ${({ theme }) => theme.text1};
`

const LinkWrapper = styled.div`
  color: ${({ theme }) => theme.blue1};
  padding: 6px 24px;
`

const SomethingWentWrongWrapper = styled.div`
  padding: 6px 24px;
`

type ErrorBoundaryState = {
  error: Error | null
}

const IS_ZEROZERO = window.location.hostname === 'app.zerozero.markets'

export default class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
  constructor(props: unknown) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //TODO report errors to error tracker
  }

  render() {
    const { error } = this.state

    if (error !== null) {
      return (
        <FallbackWrapper>
          <BodyWrapper>
            <AutoColumn gap={'md'}>
              <SomethingWentWrongWrapper>
                <ThemedText.Label fontSize={24} fontWeight={600}>
                  <Trans>Something went wrong</Trans>
                </ThemedText.Label>
              </SomethingWentWrongWrapper>
              <CodeBlockWrapper>
                <code>
                  <ThemedText.Main fontSize={10}>{error.stack}</ThemedText.Main>
                </code>
              </CodeBlockWrapper>
              {IS_ZEROZERO ? (
                <AutoRow>
                  <LinkWrapper>
                    <ExternalLink id="join-us-on-twitter" href="https://twitter.com/zerozero_fdtn" target="_blank">
                      <ThemedText.Link fontSize={16}>
                        <Trans>Join up on Twitter</Trans>
                        <span>↗</span>
                      </ThemedText.Link>
                    </ExternalLink>
                  </LinkWrapper>
                  <LinkWrapper>
                    <ExternalLink id="get-support-on-discord" href="https://discord.gg/p00ls" target="_blank">
                      <ThemedText.Link fontSize={16}>
                        <Trans>Get support on Discord</Trans>
                        <span>↗</span>
                      </ThemedText.Link>
                    </ExternalLink>
                  </LinkWrapper>
                </AutoRow>
              ) : null}
            </AutoColumn>
          </BodyWrapper>
        </FallbackWrapper>
      )
    }
    return this.props.children
  }
}
