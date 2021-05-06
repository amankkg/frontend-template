import {t} from '@lingui/macro'
import {Autocomplete, IconButton, TextField} from '@material-ui/core'
import styled from '@emotion/styled'
import {NavLink, useNavigate} from 'react-router-dom'
import {useRef} from 'react'
import {NavigateNext} from '@material-ui/icons'

type Props = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const NavMenu = ({locale, setLocale}: Props) => {
  const navigate = useNavigate()
  const navRef = useRef('')

  const navigateNext = () => navigate(navRef.current)

  return (
    <Nav>
      <MyLink to="a">{t`go to page a`}</MyLink>
      <MyLink to="b">{t`go to page b`}</MyLink>
      <MyLink to="users">{t`users page`}</MyLink>
      <MyTextField
        size="small"
        onChange={(event) => (navRef.current = event.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={navigateNext}>
              <NavigateNext />
            </IconButton>
          ),
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') navigateNext()
        }}
        label={t`pathname to navigate`}
      />
      <Autocomplete<Locale>
        value={locale}
        onChange={(_, value) => {
          if (value) setLocale(value)
        }}
        renderInput={(props) => <MyTextField {...props} />}
        options={['en', 'ky']}
      />
    </Nav>
  )
}

const MyLink = styled(NavLink)`
  margin: 0 10px;
`

const MyTextField = styled(TextField)`
  margin: 5px;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
`
