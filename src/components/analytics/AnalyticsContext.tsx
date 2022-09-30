import { AnalyticsSnippet } from '@segment/analytics-next'
import { min } from '@segment/snippet'
import React, { createContext, useMemo } from 'react'

import { AnalyticsEvent, getEventName } from './events'

const WRITE_KEY = process.env.REACT_APP_SEGMENT_KEY

export interface AnalyticsWrapper {
  trackEvent(eventName: AnalyticsEvent, properties?: Record<string, unknown>): Promise<any>

  identifyUser(userId?: string, traits?: Record<string, unknown>): Promise<any>

  trackPage(url: string): Promise<any>
}

export const AnalyticsContext = createContext<AnalyticsWrapper | undefined>(undefined)

interface AnalyticsProviderProps {
  children: React.ReactNode
}

declare global {
  interface Window {
    analytics: AnalyticsSnippet
  }
}

const segmentAnalytics: () => AnalyticsWrapper = () => {
  const trackEvent: AnalyticsWrapper['trackEvent'] = async (event, properties) => {
    return window.analytics?.track(getEventName(event), properties)
  }

  const identifyUser: AnalyticsWrapper['identifyUser'] = async (userId, traits = {}) => {
    if (userId) {
      return window.analytics?.identify(userId, traits)
    }
    window.analytics?.reset()
    return Promise.resolve()
  }

  const trackPage: AnalyticsWrapper['trackPage'] = async () => {
    return window.analytics?.page()
  }
  return { trackEvent, identifyUser, trackPage }
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }: AnalyticsProviderProps) => {
  const loadAnalytics = () => {
    if (WRITE_KEY) {
      return segmentAnalytics()
    }
    return undefined
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const a = useMemo(loadAnalytics, [])

  const segmentSnippet = () => {
    return min({
      apiKey: WRITE_KEY,
      page: {},
      load: false,
    })
  }

  return (
    <AnalyticsContext.Provider value={a}>
      {children}
      {WRITE_KEY && (
        <>
          <script id="segment" dangerouslySetInnerHTML={{ __html: segmentSnippet() }} />
        </>
      )}
    </AnalyticsContext.Provider>
  )
}
