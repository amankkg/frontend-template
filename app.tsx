import {CssBaseline} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useRoutes} from 'react-router-dom'
import {H1, MyButton} from 'atoms'
import {routeConfig} from './route-config'
import {t} from '@lingui/macro'
import {I18nProvider} from '@lingui/react'
import {i18n} from '@lingui/core'
import {dynamicActivate} from './i18n'
import {NavMenu} from './nav-menu'

export const App = () => {
  const [count, setCount] = useState(0)
  const [locale, setLocale] = useState<Locale>('en')
  const pageElement = useRoutes(routeConfig)

  useEffect(() => {
    dynamicActivate(locale)
  }, [locale])

  const onClick = () => setCount((x) => x - 5)

  return (
    <I18nProvider i18n={i18n}>
      <CssBaseline />
      <NavMenu locale={locale} setLocale={setLocale} />
      {pageElement}
      <H1>Hello world! {count}</H1>
      <MyButton onClick={onClick} variant="outlined" color="primary">
        {t`increment`}
      </MyButton>
    </I18nProvider>
  )
}
