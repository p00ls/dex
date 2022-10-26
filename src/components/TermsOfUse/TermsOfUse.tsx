import Cookies from 'js-cookie'
import { ReactNode, useCallback, useState } from 'react'

import { ACCEPTED_TERMS_OF_USE_COOKIE } from './constants'
import { TermsOfUseView } from './TermsOfUseView'

interface Props {
  children: ReactNode
}

export const TermsOfUse: React.FC<Props> = ({ children }: Props) => {
  const [accepted, setAccepted] = useState(Cookies.get(ACCEPTED_TERMS_OF_USE_COOKIE) === '1')
  const accept = useCallback(() => {
    Cookies.set(ACCEPTED_TERMS_OF_USE_COOKIE, '1', { expires: 366 })
    setAccepted(true)
  }, [])
  if (!accepted) return <TermsOfUseView accept={accept} />
  return <>{children}</>
}
