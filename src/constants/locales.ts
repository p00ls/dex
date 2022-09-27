export const SUPPORTED_LOCALES = [
  // order as they appear in the language dropdown
  'en-US',
  'es-ES',
  'fr-FR',
  'pt-BR',
] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en-US'

export { messages as DEFAULT_MESSAGES } from '../locales/en-US'

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-US': 'English',
  'es-ES': 'Español',
  'fr-FR': 'Français',
  'pt-BR': 'Português',
}
