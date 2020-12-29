import {StrictMode} from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {App} from './app'

const root = document.querySelector('#root')

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  root,
)

import.meta.hot?.accept()
