import {StrictMode} from 'react'
import {render} from 'react-dom'
import { App } from './app'

const root = document.querySelector('#root')

render(<StrictMode><App /></StrictMode>, root)

import.meta.hot?.accept()
