import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationActions, TabNavigator } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { selectPolicies } from '~/common/store/policies/selectors'
import IPolicyDetailsScreen from '~/native/screens/PolicyDetailsScreen'
import PolicyDocumentsScreen from '~/native/screens/PolicyDocumentsScreen'

import { BLUE, PINK, WHITE } from '../../common/constants/palette'

import {
  IMotorPolicy,
  IMotorPolicyMap,
  INavReduxState,
  IReactNavigationProp,
  IReduxState,
  IRoute,
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
    Details: { screen: IPolicyDetailsScreen },
    Documents: { screen: PolicyDocumentsScreen },
  },
  {
    initialRouteName: 'Details',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: styles.nativeTabBar,
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

interface IPolicyDetailsNavigatorHeaderProps {
  policyId: string
  policyIndex: number
}

interface IPolicyDetailsNavigatorHeaderConnectedProps
  extends IPolicyDetailsNavigatorHeaderProps,
    DispatchProp<any> {
  policies: IMotorPolicyMap
  nav: INavReduxState
}

const PolicyDetailsNavigatorHeader: React.ComponentClass<
  IPolicyDetailsNavigatorHeaderProps
> = connect((state: IReduxState) => ({
  policies: selectPolicies(state),
  nav: state.nav,
}))((props: IPolicyDetailsNavigatorHeaderConnectedProps) => {
  const { policies, policyId, policyIndex, nav, dispatch } = props

  // If unmounting (e.g. on clear mock policies) or policies not loaded, policy can be null
  const policy: IMotorPolicy | null = policies[policyId]

  if (policy) {
    return (
      <BackgroundHeader
        headerText={`Motor Policy${policyIndex ? ` ${policyIndex}` : ''}`}
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
}) as any

interface IPolicyDetailsNavigatorProps extends DispatchProp<any> {
  navigation: IReactNavigationProp
}

// Subclassed to allow addition of custom header. The reason for this is that react-navigation
// ignores the header property within navigationOptions on nested tab navigators.
// tslint:disable-next-line:max-classes-per-file
class PolicyDetailsNavigator extends (PolicyDetailsTabNavigator as any)<
  IPolicyDetailsNavigatorProps
> {
  private props: IPolicyDetailsNavigatorProps

  public componentWillMount() {
    console.log('PolicyDetailsNavigator', this)
    const params = this.getParams()
    if (params.showDocuments) {
      const navigation = this.props.navigation
      navigation.dispatch(
        NavigationActions.navigate({ routeName: 'Documents' }),
      )
    }
  }

  public render() {
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

  private getParams(): { [key: string]: any } {
    let state: any = this.props.navigation.state
    let params = state.params

    // May have navigated straight to a subroute, e.g. documents
    // in which case react-navigation is annoying in that it only sets the params
    // on the state of the subroute...
    if (!params && state.index) {
      state = state.routes[state.index]
      params = state.params
    }

    if (!params) throw new Error('No params passed to PolicyDetailsNavigator')
    return params
  }

  private getPolicyId(): string {
    const params = this.getParams()
    const policyId = params.policyId

    if (!policyId) {
      // policyId must be passed to params when executing Navigations.navigate
      throw new Error(
        'policyId is missing from the route parameters when attempting to render PolicyDetailsNavigator',
      )
    }

    if (typeof policyId === 'string') {
      return policyId
    }

    throw new TypeError('policyId must be of type string')
  }

  private getPolicyIndex(): number {
    const params = this.getParams()
    const policyIndex = params.policyIndex
    if (policyIndex === undefined) {
      // policyId must be passed to params when executing Navigations.navigate
      throw new Error(
        'policyIndex is missing from the route parameters when attempting to render PolicyDetailsNavigator',
      )
    }
    if (typeof policyIndex === 'number') return policyIndex

    throw new TypeError('policyIndex should be a number')
  }

  private renderCustomTabs() {
    // Here we are rendering the tabs using React Native as opposed to using native tabs which lack
    // the customisation neccessary to match the designs across both android & iOS
    const navigation = this.props.navigation
    const routes = navigation.state.routes

    return routes.map((r: IRoute, idx: number) => {
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
}

export default PolicyDetailsNavigator
