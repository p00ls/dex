import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { DEFAULT_LOCALE, DEFAULT_MESSAGES, SupportedLocale } from 'constants/locales'
import { initialLocale, useActiveLocale } from 'hooks/useActiveLocale'
import { en, es, fr, PluralCategory, pt } from 'make-plural/plurals'
import { useEffect } from 'react'
import { ReactNode } from 'react'
import { useUserLocaleManager } from 'state/user/hooks'

type LocalePlural = {
  [key in SupportedLocale]: (n: number | string, ord?: boolean) => PluralCategory
}

const plurals: LocalePlural = {
  'en-US': en,
  'es-ES': es,
  'fr-FR': fr,
  'pt-BR': pt,
}

async function dynamicActivate(locale: SupportedLocale) {
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] })
  const { messages } = locale === DEFAULT_LOCALE ? { messages: DEFAULT_MESSAGES } : await import(`locales/${locale}`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

dynamicActivate(initialLocale)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useActiveLocale()
  const [, setUserLocale] = useUserLocaleManager()

  useEffect(() => {
    dynamicActivate(locale)
      .then(() => {
        document.documentElement.setAttribute('lang', locale)
        setUserLocale(locale) // stores the selected locale to persist across sessions
      })
      .catch((error) => {
        console.error('Failed to activate locale', locale, error)
      })
  }, [locale, setUserLocale])

  return (
    <I18nProvider forceRenderOnLocaleChange={false} i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
