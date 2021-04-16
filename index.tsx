import {StrictMode} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {App} from './app'

const root = document.querySelector('#root')

render(
  <StrictMode>
    <Router>
      <App />
    </Router>  
  </StrictMode>,
  root,
)

import.meta.hot?.accept()
