// @flow

import { createLogger } from 'redux-logger'
import { createStore as _createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// TODO - import freeze from 'redux-freeze'
import env from 'jog/src/config/env.json'
import reducer from 'jog/src/redux/reducer'
import type { Store } from 'jog/src/types'
import authSaga from 'jog/src/redux/screens/auth/sagas'

export default function createStore(): Store {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    sagaMiddleware
  ]

  const isDebug = env.environment === 'DEBUG'

  if (isDebug) {
    middleware.push(createLogger())
    // TODO: Causes a strange error with XMLHTTPRequest: "the responseText property is only available if responseType..."
    // middleware.push(freeze)
  }


  const store = _createStore(
    reducer,
    undefined,
    applyMiddleware.apply(applyMiddleware, middleware),
  )

  sagaMiddleware.run(authSaga)

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
