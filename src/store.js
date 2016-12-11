import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import pokemonsStore from './reducers/pokemons_reducer'
// import other reducers here

const combinedReducers = combineReducers({
  pokemonsStore
  // add imported renamed reducers here
})

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify here name, actionsBlacklist, actionsCreators and other options
    })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // applyMiddleware(...middleware),
  // other store enhancers if any
)

const store = createStore(combinedReducers, enhancer)

export default store
