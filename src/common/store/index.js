// @flow

import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import freeze from 'redux-freeze'

import { pollUserSaga, authSaga, userSyncSaga } from './auth/sagas'

import { NavigationAdapter, UploadAdapter } from '../types'
import type { Store } from '../types'

import saga from './sagas'
import { syncPoliciesSaga, policyOperationsSaga } from './policies/sagas'
import { syncInsurersSaga } from './insurers/sagas'
import { addPolicySaga } from './screens/addManualPolicy/sagas'
import authScreenSaga from './screens/auth/sagas'
import { addPolicyScreenSaga } from './screens/addPolicyScreen/sagas'
import { addAddressSaga } from './markets/index'

let store = null
let navigationAdaptor: typeof NavigationAdapter | null = null
let uploadAdaptor: typeof UploadAdapter | null = null

type CreateStoreOpts = {
  enableDevTools?: boolean,
  freeze?: boolean,
  reducer: any,
  sagas?: Function[],
  navigationAdaptor: typeof NavigationAdapter,
  uploadAdaptor: typeof UploadAdapter,
  middleware: any[],
}

export default function createStore(_opts: CreateStoreOpts): Store {
  const opts = {
    enableDevTools: false,
    freeze: false,
    sagas: [],
    middleware: [],
    ..._opts,
  }
  if (!store) {
    navigationAdaptor = opts.navigationAdaptor
    uploadAdaptor = opts.uploadAdaptor
    const sagaMiddleware = createSagaMiddleware()

    const middleware = [sagaMiddleware, ...opts.middleware]

    if (opts.freeze) {
      middleware.push(freeze)
    }

    let enhancer

    console.log('middleware', middleware)

    // eslint-disable-next-line valid-typeof
    if (typeof window === undefined) {
      enhancer = compose(
        applyMiddleware(...middleware),
        devTools({
          name: 'Jog',
          hostname: 'localhost',
          port: 5678,
        }),
      )
    } else {
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

      enhancer = composeEnhancers(applyMiddleware(...middleware))
    }

    store = _createStore(opts.reducer, undefined, enhancer)

    const sagas = [
      authScreenSaga,
      authSaga,
      pollUserSaga,
      userSyncSaga,
      syncPoliciesSaga,
      policyOperationsSaga,
      syncInsurersSaga,
      addPolicySaga,
      addPolicyScreenSaga,
      saga,
      addAddressSaga,
      ...opts.sagas,
    ]

    sagas.forEach(s => sagaMiddleware.run(s))

    // if (module.hot) {
    //   // Enable Webpack hot module replacement for reducers
    //   module.hot.accept('./reducer', () => {
    //     const nextRootReducer = require('../../native/store/reducer')
    //     store.replaceReducer(nextRootReducer)
    //   })
    // }
  }

  return store
}

export function getStore(): Store {
  if (!store) throw new Error('Store not initialised')
  return store
}

export function getNavigationAdapter(): typeof NavigationAdapter {
  if (!navigationAdaptor) throw new Error('Store not initialised')
  return navigationAdaptor
}

export function getUploadAdapter(): typeof UploadAdapter {
  if (!uploadAdaptor) throw new Error('Store not initialised')
  return uploadAdaptor
}
