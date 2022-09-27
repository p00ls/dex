const linguiConfig = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['<rootDir>/src'],
    },
  ],
  compileNamespace: 'cjs',
  fallbackLocales: {
    default: 'en-US',
  },
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
  locales: ['en-US', 'es-ES', 'fr-FR', 'pt-BR'],
  orderBy: 'messageId',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
  sourceLocale: 'en-US',
}

export default linguiConfig
