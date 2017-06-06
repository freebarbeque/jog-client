// @flow

import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import freeze from 'redux-freeze'

import reducer from 'jog/src/common/store/reducer'
import type { Store } from 'jog/src/types'
import authScreenSaga from 'jog/src/common/store/screens/auth/sagas'
import {
  pollUserSaga,
  authSaga,
  userSyncSaga,
} from 'jog/src/common/store/auth/sagas'

import saga from './sagas'
import { syncPoliciesSaga, policyOperationsSaga } from './policies/sagas'
import { syncInsurersSaga } from './insurers/sagas'
import { addPolicySaga } from './screens/addManualPolicy/sagas'
import {
  pushNotificationSaga,
  pushNotificationSubscriptionSaga,
} from './push/sagas'
import { NavigationAdapter } from '../../types'

let store = null
let navigationAdaptor: typeof NavigationAdapter | null = null

type CreateStoreOpts = {
  enableDevTools?: boolean,
  freeze?: boolean,
}

export default function createStore(
  _navigationAdaptor: typeof NavigationAdapter,
  _opts: CreateStoreOpts = {},
): Store {
  const opts = {
    enableDevTools: false,
    freeze: false,
    ..._opts,
  }
  if (!store) {
    navigationAdaptor = _navigationAdaptor
    const sagaMiddleware = createSagaMiddleware()

    const middleware = [sagaMiddleware]

    if (opts.freeze) {
      middleware.push(freeze)
    }

    const enhancer = compose(
      applyMiddleware(...middleware),
      opts.enableDevTools
        ? devTools({
            name: 'Jog',
            hostname: 'localhost',
            port: 5678,
          })
        : undefined,
    )

    store = _createStore(reducer, undefined, enhancer)

    // Auth sagas
    sagaMiddleware.run(authScreenSaga)
    sagaMiddleware.run(authSaga)
    sagaMiddleware.run(pollUserSaga)
    sagaMiddleware.run(userSyncSaga)

    // General data
    sagaMiddleware.run(syncPoliciesSaga)
    sagaMiddleware.run(policyOperationsSaga)
    sagaMiddleware.run(syncInsurersSaga)

    sagaMiddleware.run(addPolicySaga)

    sagaMiddleware.run(pushNotificationSubscriptionSaga)
    sagaMiddleware.run(pushNotificationSaga)

    // Global data
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
