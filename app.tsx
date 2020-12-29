import {CssBaseline, IconButton, TextField} from '@material-ui/core'
import {useRef, useState} from 'react'
import {NavLink, useNavigate, useRoutes} from 'react-router-dom'
import {H1, MyButton} from 'atoms'
import {routeConfig} from './route-config'
import styled from '@emotion/styled'
import {NavigateNext} from '@material-ui/icons'

export const App = () => {
  const [count, setCount] = useState(0)
  const routeElement = useRoutes(routeConfig)
  const navigate = useNavigate()
  const navRef = useRef('')

  const navigateNext = () => navigate(navRef.current)
  const onClick = () => setCount((x) => x - 5)

  return (
    <>
      <CssBaseline />
      <Nav>
        <MyLink to="a">Go to Page A</MyLink>
        <MyLink to="b">Go to Page B</MyLink>
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
          label="pathname to navigate"
        />
      </Nav>
      {routeElement}
      <H1>Hello world! {count}</H1>
      <MyButton onClick={onClick} variant="outlined" color="primary">
        increment
      </MyButton>
    </>
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
  align-items: center
`
