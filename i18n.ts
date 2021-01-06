import {i18n} from '@lingui/core'

const loadMessages = (locale: Locale) => {
  switch (locale) {
    case 'ky':
      // @ts-expect-error
      return import('./locales/ky.po')
    case 'en':
    default:
      // @ts-expect-error
      return import('./locales/en.po')
  }
}

const getPluralRules = (locale: Locale) => {
  const tag = locale === 'ky' ? 'ky-KG' : 'en-US'
  const ordinalPlurals = new Intl.PluralRules(tag, {type: 'ordinal'})
  const cardinalPlurals = new Intl.PluralRules(tag, {type: 'cardinal'})

  return (count: number, ordinal: boolean) =>
    (ordinal ? ordinalPlurals : cardinalPlurals).select(count)
}

export async function dynamicActivate(locale: Locale) {
  const {messages} = await loadMessages(locale)

  i18n.loadLocaleData(locale, {plurals: getPluralRules(locale)})
  i18n.load(locale, messages)
  i18n.activate(locale)
}
