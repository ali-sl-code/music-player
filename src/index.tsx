import * as React from 'react'
import ReactDOM from 'react-dom'
// import 'module-alias/register'
import { StyledEngineProvider } from '@mui/material/styles'
import App from 'App'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    {/* <StyledEngineProvider injectFirst></StyledEngineProvider> */}
    <App />
  </Auth0Provider>,
  document.querySelector('#root'),
)
