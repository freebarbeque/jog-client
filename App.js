// @flow
import React from 'react'

import { addNavigationHelpers } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import RootNavigator from './src/navigators/RootNavigator'
import createStore from './src/redux/createStore'
import type { RootReduxState } from './src/redux/typedefs'

const AppWithRootNavigationState = connect((state: RootReduxState) => ({
  nav: state.nav,
}))(({ dispatch, nav }) => {
  console.log('nav', nav)
  return (
    <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  )
})

const store = createStore()

export default class ReduxExampleApp extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithRootNavigationState />
      </Provider>
    )
  }
}

