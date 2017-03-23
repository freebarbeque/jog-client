/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@expo/ex-navigation'
import type { RootReduxState } from '../redux/typedefs'
import type { User } from '../data/typedefs'
import router from '../router'

type HomeProps = {
  user: User | null
};
type HomeState = {};

class Home extends Component {
  props: HomeProps
  state: HomeState

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  constructor(props: HomeProps) {
    super(props)
    this.state = {}
  }

  render() {
    const user = this.props.user

    return (
      <View style={styles.container}>
        <TabNavigation
          id="main"
          navigatorUID="main"
          initialTab="markets"
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

      </View>
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
