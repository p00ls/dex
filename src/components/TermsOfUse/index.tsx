import Cookies from 'js-cookie'
import { ReactNode, useCallback, useState } from 'react'

import { TermsOfUseView } from './TermsOfUseView'

interface Props {
  children: ReactNode
}

const acceptedTermsOfUseCookie = 'accepted_terms_of_use'

export const TermsOfUse: React.FC<Props> = ({ children }: Props) => {
  const [accepted, setAccepted] = useState(Cookies.get(acceptedTermsOfUseCookie) === '1')
  const accept = useCallback(() => {
    Cookies.set(acceptedTermsOfUseCookie, '1', { expires: 366 })
    setAccepted(true)
  }, [])
  if (!accepted) return <TermsOfUseView accept={accept} />
  return <>{children}</>
}
