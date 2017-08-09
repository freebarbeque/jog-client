import { applyMiddleware, compose, createStore as _createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'

// tslint:disable-next-line:no-var-requires
const freeze = require('redux-freeze')

import { authSaga, pollUserSaga, userSyncSaga } from './auth/sagas'

import { Store } from '../types'

import { syncInsurersSaga } from './insurers/sagas'
import {
  addMarketEntitySaga,
  syncAddressesSaga,
  syncCarsSaga,
  syncDriversSaga,
} from './markets/index'
import { quoteRequestsSyncSaga } from './markets/quoteRequests'
import { policyOperationsSaga, syncPoliciesSaga } from './policies/sagas'
import saga from './sagas'
import { addPolicySaga } from './screens/addManualPolicy/sagas'
import { addPolicyScreenSaga } from './screens/addPolicyScreen/sagas'
import authScreenSaga from './screens/auth/sagas'

let store: any = null
let navigationAdaptor: any = null
let uploadAdaptor: any = null

interface ICreateStoreOpts {
  enableDevTools?: boolean
  freeze?: boolean
  reducer: any
  sagas?: any[]
  navigationAdaptor: any
  uploadAdaptor: any
  middleware: any[]
}

export default function createStore(additionalOpts: ICreateStoreOpts): Store {
  const opts = {
    enableDevTools: false,
    freeze: false,
    sagas: [],
    middleware: [],
    ...additionalOpts,
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

    // tslint:disable-next-line:typeof-compare
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
