import { FirebaseOptions, initializeApp } from '@firebase/app'
import { getToken, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@firebase/app-check'
import React, { ReactNode, useCallback, useContext, useMemo } from 'react'

export interface Firebase {
  getAppCheckToken: () => Promise<string>
}

export const FirebaseContext = React.createContext<Firebase | undefined>(undefined)

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const initFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig)
  const appCheck = initializeAppCheck(firebaseApp, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider: new ReCaptchaEnterpriseProvider(process.env.REACT_APP_RECAPTCHA_SCORE_KEY!),
    isTokenAutoRefreshEnabled: true,
  })

  return { firebaseApp, appCheck }
}

export const FirebaseProvider = ({ children }: { children?: ReactNode }) => {
  const { appCheck } = useMemo(() => initFirebase(), [])
  const getAppCheckToken = useCallback(async () => {
    const token = await getToken(appCheck)
    return token.token
  }, [appCheck])
  return <FirebaseContext.Provider value={{ getAppCheckToken }}>{children}</FirebaseContext.Provider>
}

export const FakeFirebaseProvider = ({ children }: { children?: ReactNode }) => {
  const getAppCheckToken = useCallback(async () => 'fake-token', [])
  return <FirebaseContext.Provider value={{ getAppCheckToken }}>{children}</FirebaseContext.Provider>
}

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext)
  if (!firebase) {
    throw new Error('FirebaseContext is not found.')
  }
  return firebase
}
