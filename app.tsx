import styled from '@emotion/styled'
import {Button, CssBaseline} from '@material-ui/core'
import {useState} from 'react'

export const App = () => {
  const [count, setCount] = useState(0)

  const onClick = () => setCount((x) => x - 5)

  return (
    <div>
      <CssBaseline />
      <H1>Hello world! {count}</H1>
      <MyButton onClick={onClick} variant="outlined" color="primary">
        increment
      </MyButton>
    </div>
  )
}

const H1 = styled.h1`
  color: hotpink;
`

const MyButton = styled(Button)`
  font-weight: bold;
  border-style: dotted;
`