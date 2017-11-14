import {applyMiddleware, compose, createStore as _createStore, Store} from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'
import {ICreateStoreOpts, IReduxState} from '../interfaces/store';
import auth from '../sagas/auth';

// tslint:disable-next-line:no-var-requires
const freeze = require('redux-freeze');

let store: any = null;

const defaultSagas: any[] = [
    auth,
];

export default function createStore(additionalOpts: ICreateStoreOpts): Store<IReduxState> {
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

        store = _createStore(opts.reducer, undefined, enhancer);

        const sagas = [...defaultSagas, ...opts.sagas];
        sagas.forEach(s => sagaMiddleware.run(s));

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