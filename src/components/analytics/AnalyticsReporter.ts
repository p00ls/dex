import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useAnalytics } from './hooks/useAnalytics'

export default function AnalyticsReporter({ location: { pathname, search } }: RouteComponentProps): null {
  const { trackPage } = useAnalytics()

  useEffect(() => {
    trackPage(`${pathname}${search}`)
  }, [trackPage, pathname, search])
  return null
}
