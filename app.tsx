import { Container, CssBaseline } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { H1, MyButton } from 'atoms';
import { routeConfig } from './route-config';
import { t } from '@lingui/macro';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { dynamicActivate } from './i18n';
import { NavMenu } from './nav-menu';

export const App = () => {
  const [locale, setLocale] = useState<Locale>('en');
  const pageElement = useRoutes(routeConfig);

  useEffect(() => {
    dynamicActivate(locale);
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <CssBaseline />
      <NavMenu locale={locale} setLocale={setLocale} />
      <Container>{pageElement}</Container>
    </I18nProvider>
  );
};
