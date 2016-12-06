import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Dashboard from './components/Dashboard' // Home page
import List from './components/List'
import Details from './components/Details'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='pokemons/page:page' component={List} />
    <Route path='pokemons/page:page/pokemon/:id' component={Details} />
  </Route>
)
