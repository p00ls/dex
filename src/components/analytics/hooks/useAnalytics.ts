import { useContext } from 'react'

import { AnalyticsContext } from '../AnalyticsContext'

export const useAnalytics = () => {
  const analyticsContext = useContext(AnalyticsContext)
  if (!analyticsContext) {
    throw new Error('Not inside analytics context')
  }
  return analyticsContext
}
