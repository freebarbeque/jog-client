import {applyMiddleware, compose, createStore as _createStore, Store} from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import {ICreateStoreOpts, IReduxState, IStore} from '../interfaces/store';
import root from '../sagas/root';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// tslint:disable-next-line:no-var-requires
const freeze = require('redux-freeze');

let store: any = null;
let persistor: any = null;

const defaultSagas: any[] = [
    root,
];

interface IWindow extends Window {
    store: IStore;
}

declare const window: IWindow;

export default function createStore(additionalOpts: ICreateStoreOpts): any {
    const opts = {
        enableDevTools: false,
        freeze: false,
        sagas: [],
        middleware: [],
        ...additionalOpts,
    }

    if (!store) {
        const sagaMiddleware = createSagaMiddleware();

        const middleware = [sagaMiddleware, ...opts.middleware];

        if (opts.freeze) {
            middleware.push(freeze)
        }

        let enhancer;

        // tslint:disable-next-line:typeof-compare
        if (typeof window === undefined) {
            enhancer = compose(
                applyMiddleware(...middleware),
                devTools({
                    name: 'Jog',
                    hostname: 'localhost',
                    port: 5678,
                }),
            );
        } else {
            const composeEnhancers =
                (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

            enhancer = composeEnhancers(applyMiddleware(...middleware));
        }

        const config = {
            key: 'root',
            storage,
            whitelist: ['auth', 'policies', 'dataSource', 'userDetails', 'page'],
        }

        const reducer = persistCombineReducers(config, opts.reducer)

        store = _createStore(reducer, undefined, enhancer);
        window.store = store;
        persistor = persistStore(store);

        const sagas = [...defaultSagas, ...opts.sagas];
        sagas.forEach(s => sagaMiddleware.run(s));

        store.runSaga = sagaMiddleware.run;

        // if (module.hot) {
        //   // Enable Webpack hot module replacement for reducers
        //   module.hot.accept('./reducer', () => {
        //     const nextRootReducer = require('../../native/store/reducer')
        //     store.replaceReducer(nextRootReducer)
        //   })
        // }
    }

    return {persistor, store}
}