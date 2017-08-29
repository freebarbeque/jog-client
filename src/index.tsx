import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import 'regenerator-runtime/runtime'

import createStore from './common/store/index'
import { dimensionsSubscriptionSaga } from './web/store/dimensions/sagas'
import reducer from './web/store/reducer'

import { WHITE } from './common/constants/palette'
import initialiseFirebase from './common/data/index'
import { setMixPanelToken } from './common/mixpanel'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './web/App'
import env from './web/env'
import history from './web/history'
import { WebNavigationAdapter } from './web/WebNavigationAdapter'
import WebUploadAdapter from './web/WebUploadAdapter'

// tslint:disable-next-line:no-var-requires
const injectTapEventPlugin = require('react-tap-event-plugin')

const BLUE = '#131733'
const PINK = '#ff4d62'
const GRAY = '#797e9a'

initialiseFirebase(env)
setMixPanelToken(env.mixPanel.token)

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

render(App)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

registerServiceWorker()
