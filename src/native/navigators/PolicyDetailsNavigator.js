// @flow
import React from 'react'
import { TabNavigator, NavigationActions } from 'react-navigation'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

import PolicyDetailsScreen from 'jog/src/native/screens/PolicyDetailsScreen'
import PolicyDocumentsScreen from 'jog/src/native/screens/PolicyDocumentsScreen'
import { selectPolicies } from 'jog/src/common/store/policies/selectors'

import { BLUE, PINK, WHITE } from '../../common/constants/palette'
import type {
  Dispatch,
  MotorPolicy,
  NavReduxState,
  ReactNavigationProp,
  ReduxState,
  Route,
} from '../../common/types'
import BackgroundHeader from '../components/BackgroundHeader'
import Text from '../components/Text'
import { getRouteKey } from '../util/nav'

const ACTIVE_TAB_BORDER_WIDTH = 5

const styles = StyleSheet.create({
  nativeTabBar: {
    // Hack the native tab bar away
    // The other option is to add navigationOptions to every screen with tabBarVisible: false
    height: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  activeTab: {
    borderBottomColor: PINK,
    borderBottomWidth: ACTIVE_TAB_BORDER_WIDTH,
  },
  tabBar: {
    backgroundColor: WHITE,
    height: 53,
    flexDirection: 'row',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgb(126,130,142)',
  },
  activeTabText: {
    fontWeight: '600',
    color: BLUE,
    // The border pushes the text up, so we counter-act this with a margin
    marginTop: ACTIVE_TAB_BORDER_WIDTH,
  },
  tabDivider: {
    height: 30,
    width: 1,
    backgroundColor: 'rgb(204, 207, 211)',
    position: 'absolute',
    left: 0,
    top: 12,
  },
})

const PolicyDetailsTabNavigator = TabNavigator(
  {
    Details: { screen: PolicyDetailsScreen },
    Documents: { screen: PolicyDocumentsScreen },
  },
  {
    initialRouteName: 'Details',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'top',
    upperCaseLabel: false,

    tabBarOptions: {
      style: styles.nativeTabBar,
      labelStyle: styles.tabBarLabel,
      showIcon: false,
      activeTintColor: BLUE,
      inactiveTintColor: 'rgb(126,130,142)',
      indicatorStyle: {
        height: 5,
        backgroundColor: PINK,
      },
      // Android only (defaults to uppercase)
      upperCaseLabel: false,
      tabStyle: styles.tab,
    },
  },
)

const PolicyDetailsNavigatorHeader = connect((state: ReduxState) => ({
  policies: selectPolicies(state),
  nav: state.nav,
}))(props => {
  const { policies, policyId, policyIndex, nav, dispatch } = props

  // If unmounting (e.g. on clear mock policies) or policies not loaded, policy can be null
  const policy: MotorPolicy | null = policies[policyId]

  if (policy) {
    return (
      <BackgroundHeader
        headerText={`Motor Policy ${policyIndex}`}
        subheaderText={policy.name}
        onPress={() => {
          const key = getRouteKey(nav, 'PolicyDetails')
          if (key) {
            dispatch(NavigationActions.back({ key }))
          }
        }}
      />
    )
  }

  return null
})

type PolicyDetailsNavigatorProps = {
  dispatch: Dispatch,
  navigation: ReactNavigationProp,
}

// Subclassed to allow addition of custom header. The reason for this is that react-navigation
// ignores the header property within navigationOptions on nested tab navigators.
class PolicyDetailsNavigator extends PolicyDetailsTabNavigator {
  props: PolicyDetailsNavigatorProps

  getPolicyId(): string {
    const params = this.props.navigation.state.params
    const policyId = params.policyId
    if (!policyId) {
      // policyId must be passed to params when executing Navigations.navigate
      throw new Error(
        'policyId is missing from the route parameters when attempting to render PolicyDetailsNavigator',
      )
    }
    return policyId
  }

  getPolicyIndex(): string {
    const params = this.props.navigation.state.params
    const policyIndex = params.policyIndex
    if (policyIndex === undefined) {
      // policyId must be passed to params when executing Navigations.navigate
      throw new Error(
        'policyIndex is missing from the route parameters when attempting to render PolicyDetailsNavigator',
      )
    }
    return policyIndex
  }

  renderCustomTabs() {
    // Here we are rendering the tabs using React Native as opposed to using native tabs which lack
    // the customisation neccessary to match the designs across both android & iOS
    const navigation = this.props.navigation
    const routes = navigation.state.routes

    return routes.map((r: Route, idx: number) => {
      const routeName = r.routeName
      const isActive = navigation.state.index === idx
      return (
        <TouchableOpacity
          key={r.key}
          style={[styles.tab, isActive ? styles.activeTab : {}]}
          onPress={() =>
            navigation.dispatch(NavigationActions.navigate({ routeName }))}
        >
          <Text style={[styles.tabText, isActive ? styles.activeTabText : {}]}>
            {routeName}
          </Text>
          {idx ? <View style={styles.tabDivider} /> : null}
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PolicyDetailsNavigatorHeader
          policyId={this.getPolicyId()}
          policyIndex={this.getPolicyIndex()}
        />
        <View style={styles.tabBar}>
          {this.renderCustomTabs()}
        </View>
        {super.render()}
      </View>
    )
  }
}

export default PolicyDetailsNavigator
