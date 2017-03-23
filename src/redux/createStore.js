import { createLogger } from 'redux-logger'
import { createStore as _createStore, applyMiddleware } from 'redux'

import type { Store } from './typedefs'
import reducer from './reducer'

type StoreOptions = {
  logger: boolean
}

export default function createStore(opts: StoreOptions = {}) : Store {
  const middleware = []

  const optsWithDefaults = {
    logger: true,
    ...opts,
  }

  if (optsWithDefaults.logger) {
    middleware.push(createLogger())
  }

  return _createStore(
    reducer,
    undefined,
    applyMiddleware.apply(applyMiddleware, middleware),
  )
}
