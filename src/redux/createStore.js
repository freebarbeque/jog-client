// @flow

import { createLogger } from 'redux-logger'
import { createStore as _createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import env from 'jog/src/config/env.json'
import reducer from 'jog/src/redux/reducer'

import type { Store } from './typedefs'

export default function createStore(): Store {
  const middleware = [
  ]

  const isDebug = env.environment === 'DEBUG'

  if (isDebug) {
    middleware.push(createLogger())
  }

  const composeEnhancer = composeWithDevTools({
    realtime: !isDebug
  })

  const store = _createStore(
    reducer,
    undefined,
    composeEnhancer(
      applyMiddleware.apply(applyMiddleware, middleware),
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // $FlowFixMe
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      // $FlowFixMe
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
