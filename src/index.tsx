import * as React from 'react'
import ReactDOM from 'react-dom'
// import 'module-alias/register'
import { StyledEngineProvider } from '@mui/material/styles'
import Application from './components/app'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Application />
  </StyledEngineProvider>,
  document.querySelector('#root'),
)
