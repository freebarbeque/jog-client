import * as React from 'react'
import 'regenerator-runtime/runtime'
import * as ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'

import createStore from './common/store/index'
import reducer from './web/store/reducer'
import { dimensionsSubscriptionSaga } from './web/store/dimensions/sagas'

import initialiseFirebase from './common/data/index'
import App from './web/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { WebNavigationAdapter } from './web/WebNavigationAdapter'
import WebUploadAdapter from './web/WebUploadAdapter'
import history from './web/history'
import { WHITE } from './common/constants/palette'
import env from './web/env'

const injectTapEventPlugin = require('react-tap-event-plugin')

const BLUE = '#131733'
const PINK = '#ff4d62'
const GRAY = '#797e9a'

initialiseFirebase(env)

const store = createStore({
  reducer,
  freeze: true,
  navigationAdaptor: WebNavigationAdapter,
  uploadAdaptor: WebUploadAdapter,
  middleware: [routerMiddleware(history)],
  sagas: [dimensionsSubscriptionSaga],
})

const theme = getMuiTheme({
  palette: {
    primary1Color: BLUE,
    accent1Color: BLUE,
    textColor: BLUE,
  },
  tabs: {
    textColor: GRAY,
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

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

render(App)

registerServiceWorker()
