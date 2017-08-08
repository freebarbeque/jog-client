import { applyMiddleware, compose, createStore as _createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'

const freeze = require('redux-freeze')

import { authSaga, pollUserSaga, userSyncSaga } from './auth/sagas'

import { Store } from '../types'

import { syncInsurersSaga } from './insurers/sagas'
import {
  addMarketEntitySaga,
  syncAddressesSaga,
  syncDriversSaga,
  syncCarsSaga,
} from './markets/index'
import { policyOperationsSaga, syncPoliciesSaga } from './policies/sagas'
import saga from './sagas'
import { addPolicySaga } from './screens/addManualPolicy/sagas'
import { addPolicyScreenSaga } from './screens/addPolicyScreen/sagas'
import authScreenSaga from './screens/auth/sagas'
import { quoteRequestsSyncSaga } from './markets/quoteRequests'

let store = null
let navigationAdaptor: any = null
let uploadAdaptor: any = null

interface CreateStoreOpts {
  enableDevTools?: boolean
  freeze?: boolean
  reducer: any
  sagas?: Function[]
  navigationAdaptor: any
  uploadAdaptor: any
  middleware: any[]
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
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

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
      addMarketEntitySaga,
      syncAddressesSaga,
      syncDriversSaga,
      syncCarsSaga,
      quoteRequestsSyncSaga,
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

export function getNavigationAdapter() {
  if (!navigationAdaptor) throw new Error('Store not initialised')
  return navigationAdaptor
}

export function getUploadAdapter() {
  if (!uploadAdaptor) throw new Error('Store not initialised')
  return uploadAdaptor
}
