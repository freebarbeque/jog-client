// @flow
import React from 'react'
import { TabNavigator } from 'react-navigation'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import PolicyDetailsScreen from 'jog/src/screens/PolicyDetailsScreen'
import PolicyDocumentsScreen from 'jog/src/screens/PolicyDocumentsScreen'
import { BLUE, PINK, WHITE } from '../constants/palette'
import { MARGIN } from '../constants/style'
import type { Dispatch, MotorPolicy, ReactNavigationProp, ReduxState } from '../types'
import { selectPolicies } from '../store/policies/selectors'
import BackgroundHeader from '../components/BackgroundHeader'

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: WHITE,
    height: 53,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'WorkSans-Bold',
  },
  tab: {
  },
  backgroundImage: {
    height: 100,
    resizeMode: 'cover',
    width: null,
    justifyContent: 'center',
    padding: MARGIN.large
  },
  backgroundImageOverlay: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0
  },
  header: {
    fontSize: 20,
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
      style: styles.tabBar,
      labelStyle: styles.tabBarLabel,
      showIcon: false,
      activeTintColor: BLUE,
      inactiveTintColor: 'rgb(126,130,142)',
      indicatorStyle: {
        height: 5,
        backgroundColor: PINK
      },
      // Android only (defaults to uppercase)
      upperCaseLabel: false,
      tabStyle: styles.tab
    }
  }

)

type PolicyDetailsNavigatorProps = {
  dispatch: Dispatch,
  navigation: ReactNavigationProp,
}

const PolicyDetailsNavigatorHeader = connect(
  (state: ReduxState) => ({ policies: selectPolicies(state) })
)(
  (props) => {
    const { policies, policyId, policyIndex } = props
    const policy: MotorPolicy = policies[policyId]
    return (
      <BackgroundHeader
        headerText={`Motor Policy ${policyIndex}`}
        subheaderText={policy.name}
      />
    )
  }
)

// Subclassed to allow addition of custom header. The reason for this is that react-navigation
// ignores the header property within navigationOptions on nested tab navigators.
export class PolicyDetailsNavigator extends PolicyDetailsTabNavigator {
  props: PolicyDetailsNavigatorProps

  getPolicyId() : string {
    const params = this.props.navigation.state.params
    const policyId = params.policyId
    if (!policyId) {
      // policyId must be passed to params when executing Navigations.navigate
      throw new Error('policyId is missing from the route parameters when attempting to render PolicyDetailsNavigator')
    }
    return policyId
  }

  getPolicyIndex() : string {
    const params = this.props.navigation.state.params
    const policyIndex = params.policyIndex
    if (policyIndex === undefined) {
      // policyId must be passed to params when executing Navigations.navigate
      throw new Error('policyIndex is missing from the route parameters when attempting to render PolicyDetailsNavigator')
    }
    return policyIndex
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PolicyDetailsNavigatorHeader
          policyId={this.getPolicyId()}
          policyIndex={this.getPolicyIndex()}
        />
        {super.render()}
      </View>
    )
  }
}

export default PolicyDetailsNavigator
