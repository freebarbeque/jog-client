import React from 'react'
import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'

import createStore from './common/store/index'
import reducer from './web/store/reducer'

import initialiseFirebase from './common/data/index'
import App from './web/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { WebNavigationAdapter } from './web/WebNavigationAdapter'
import WebUploadAdapter from './web/WebUploadAdapter'
import history from './web/history'
import { WHITE } from './common/constants/palette'

const BLUE = '#131733'
const PINK = '#ff4d62'
const GRAY = '#797e9a'

initialiseFirebase({
  firebase: {
    apiKey: 'AIzaSyCiGNJ7RbnRaYpyK05rOnqMyt0xmVCe920',
    authDomain: 'jog-dev-10fe9.firebaseapp.com',
    databaseURL: 'https://jog-dev-10fe9.firebaseio.com',
    storageBucket: 'jog-dev-10fe9.appspot.com',
    messagingSenderId: '98399119405',
  },
})

const store = createStore({
  reducer,
  freeze: true,
  navigationAdaptor: WebNavigationAdapter,
  uploadAdaptor: WebUploadAdapter,
  middleware: [routerMiddleware(history)],
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

const app = (
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
