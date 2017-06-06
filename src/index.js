import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { white } from 'material-ui/styles/colors'

import App from './web/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const BLUE = '#131733'
const PINK = '#ff4d62'
const GRAY = '#797e9a'

const theme = getMuiTheme({
  textColor: white,
  palette: {
    primary1Color: BLUE,
    alternateTextColor: GRAY,
    textColor: white,
    accent1Color: BLUE,
  },
  tabs: {
    textColor: GRAY,
    selectedTextColor: PINK,
  },
})

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const app = (
  <MuiThemeProvider muiTheme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
