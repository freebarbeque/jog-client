// @flow

import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import freeze from 'redux-freeze'
import { Platform } from 'react-native'

import reducer from 'jog/src/store/reducer'
import type { Store } from 'jog/src/types'
import authScreenSaga from 'jog/src/store/screens/auth/sagas'
import authSaga from 'jog/src/store/auth/sagas'
import config from 'jog/src/config'

import saga from './sagas'
import { syncPoliciesSaga } from './policies/sagas'
import { syncInsurersSaga } from './insurers/sagas'

export default function createStore(): Store {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    sagaMiddleware
  ]

  if (config.isDebug) {
    // middleware.push(createLogger())
    middleware.push(freeze)
  }

  const enhancer = compose(
    applyMiddleware(...middleware),
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    })
  )

  const store = _createStore(
    reducer,
    undefined,
    enhancer
  )

  sagaMiddleware.run(authScreenSaga)
  sagaMiddleware.run(authSaga)
  sagaMiddleware.run(syncPoliciesSaga)
  sagaMiddleware.run(syncInsurersSaga)
  sagaMiddleware.run(saga)

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
