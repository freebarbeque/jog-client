// @flow

import { createLogger } from 'redux-logger'
import { createStore as _createStore, applyMiddleware } from 'redux'

import type { Store } from './typedefs'
import reducer from './reducer'

type StoreOptions = {
  logger: boolean
}

export default function createStore(opts?: StoreOptions): Store {
  const middleware = []

  const optsWithDefaults = {
    logger: true,
    ...opts,
  }

  if (optsWithDefaults.logger) {
    middleware.push(createLogger())
  }

  const store = _createStore(
    reducer,
    undefined,
    applyMiddleware.apply(applyMiddleware, middleware),
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
