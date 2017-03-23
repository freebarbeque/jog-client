/* @flow */

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@expo/ex-navigation'
import type { RootReduxState } from '../redux/typedefs'
import router from '../router'
import AuthButton from '../components/AuthButton'
import { BLUE } from '../constants/palette'
import { Logo } from '../components/images/index'

type HomeProps = {};
type HomeState = {};

class Home extends Component {
  props: HomeProps
  state: HomeState

  static route = {
    navigationBar: {
      backgroundColor: BLUE,
      renderLeft: () => <Logo style={{ marginLeft: 10, marginTop: 3 }} scale={0.2} />,
      renderRight: () => <AuthButton style={{ marginTop: 10, marginRight: 10 }} />,
    },
  }

  constructor(props: HomeProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="policies"
      >
        <TabItem
          id="policies"
          title="Policies"
          selectedStyle={styles.selectedTab}
        >
          <StackNavigation
            id="policies"
            navigatorUID="policies"
            initialRoute={router.getRoute('policies')}
          />
        </TabItem>
        <TabItem
          id="markets"
          title="Markets"
          selectedStyle={styles.selectedTab}
        >
          <StackNavigation
            id="markets"
            navigatorUID="markets"
            initialRoute={router.getRoute('markets')}
          />
        </TabItem>
        <TabItem
          id="settings"
          title="Settings"
          selectedStyle={styles.selectedTab}
        >
          <StackNavigation
            id="settings"
            navigatorUID="settings"
            initialRoute={router.getRoute('settings')}
          />
        </TabItem>
      </TabNavigation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
})

const mapStateToProps = (state: RootReduxState) => ({ user: state.user })

export default connect(
  mapStateToProps,
)(Home)

