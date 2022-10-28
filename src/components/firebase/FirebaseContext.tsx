import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app'
import { AppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@firebase/app-check'
import React, { ReactNode, useContext, useMemo } from 'react'

export interface Firebase {
  firebaseApp: FirebaseApp
  appCheck: AppCheck
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

const initFirebase = (): Firebase => {
  const firebaseApp = initializeApp(firebaseConfig)
  const appCheck = initializeAppCheck(firebaseApp, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider: new ReCaptchaEnterpriseProvider(process.env.REACT_APP_RECAPTCHA_SCORE_KEY!),
    isTokenAutoRefreshEnabled: true,
  })

  return { firebaseApp, appCheck }
}

export const FirebaseProvider = ({ children }: { children?: ReactNode }) => {
  const context: Firebase = useMemo(() => initFirebase(), [])
  return <FirebaseContext.Provider value={context}>{children}</FirebaseContext.Provider>
}

export const useFirebase = () => {
  const firebase = useContext(FirebaseContext)
  if (!firebase) {
    throw new Error('FirebaseContext is not found.')
  }
  return firebase
}
