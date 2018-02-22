import thunk from 'redux-thunk';
import { apiMiddleware, API } from 'src/web/next/api';

import 'babel-polyfill';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import history from './web/history';
import createStore from './common/store/index';
import reducer from './web/reducers';
import App from './web/App';
import './index.css';
const injectTapEventPlugin = require('react-tap-event-plugin');
import { PersistGate } from 'redux-persist/es/integration/react';

import { BLUE, PINK, DARK_GRAY, WHITE } from './common/constants/palette';

async function launch() {
    const {persistor, store} = createStore({
        reducer,
        freeze: true,
        middleware: [thunk, routerMiddleware(history), apiMiddleware],
        initialState: {
            nextStore: {
                auth: {
                    currentUser: await API.getCurrentUser(),
                }
            }
        },
    });

    const theme = getMuiTheme({
        palette: {
            primary1Color: BLUE,
            accent1Color: BLUE,
            textColor: BLUE,
        },
        tabs: {
            textColor: DARK_GRAY,
            selectedTextColor: PINK,
        },
        datePicker: {
            calendarTextColor: BLUE,
        },
        textField: {
            textColor: WHITE,
            hintColor: 'rgba(255,255,255,0.3)',
        },
    });

    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin();
    render();

    function render() {
        ReactDOM.render(
            <MuiThemeProvider muiTheme={theme}>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </MuiThemeProvider>,
            document.getElementById('root'),
        );
    }

    return render;
}

let renderFn;

launch().then(render => {
    renderFn = render
});

// Hot Module Replacement API
declare var module: any;

if (renderFn && module.hot) {
    module.hot.accept('./web/App', renderFn)
}
