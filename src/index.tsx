import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { routerMiddleware } from 'react-router-redux';
import history from './web/history'
import createStore from './common/store/index';
import reducer from './web/store/reducer';
import App from './web/App';

import {
    BLUE,
    PINK,
    DARK_GRAY,
    WHITE,
} from './common/constants/palette';

const store = createStore({
    reducer,
    freeze: true,
    middleware: [routerMiddleware(history)],
})

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
})

const render = Component => {
    ReactDOM.render(
        <MuiThemeProvider muiTheme={theme}>
            <Provider store={store}>
                <Component />
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('root'),
    )
}

render(App);
