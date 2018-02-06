import 'babel-polyfill';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {routerMiddleware} from 'react-router-redux';
import history from './web/history'
import createStore from './common/store/index';
import reducer from './web/reducers';
import App from './web/App';
import './index.css';
const injectTapEventPlugin = require('react-tap-event-plugin');
import {PersistGate} from 'redux-persist/es/integration/react';

import {
    BLUE,
    PINK,
    DARK_GRAY,
    WHITE,
} from './common/constants/palette';

const {persistor, store} = createStore({
    reducer,
    freeze: true,
    middleware: [routerMiddleware(history)],
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

const render = Component => {
    ReactDOM.render(
        <MuiThemeProvider muiTheme={theme}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Component />
                </PersistGate>
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('root'),
    )
}

render(App);
