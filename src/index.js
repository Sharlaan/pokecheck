import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import customTheme from './theme'
import Provider from 'react-redux/lib/components/Provider'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'

// Base styles for body, html tags
import './index.css'

import routes from './routes'
import store from './store'

// import ReactGA from 'react-ga'
// Initialize Google Analytics
// ReactGA.initialize('UA-000000-01')

const handleViewUpdate = () => {
  // ReactGA.pageview(window.location.pathname) // logging the page view to GoogleAnalytics
  window.scrollTo(0, 0)
}

// Required by a lof of Material-UI components for running click/touch events
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const rootEl = document.getElementById('root')

render(
  <MuiThemeProvider muiTheme={customTheme}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} onUpdate={handleViewUpdate} />
    </Provider>
  </MuiThemeProvider>,
  rootEl
)

// activates Webpack's HotModuleReload
if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default
    render(
      <Provider store={store}>
        <Router history={browserHistory} routes={nextRoutes} />
      </Provider>,
      rootEl
    )
  })
}
