import * as React from 'react'
import FadeInView from 'react-native-fade-in-view'
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator,
} from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import EmailPolicyScreen from '~/native/screens/EmailPolicyScreen'

import {
  IAuthReduxState,
  IFirebaseUser,
  INavReduxState,
  IReduxState,
} from '../../common/types'

import { BLUE } from '../../common/constants/palette'
import LoadingScreen from '../screens/LoadingScreen'

import PolicyDocumentScreen from '../screens/PolicyDocumentScreen'
import AddPolicyNavigator from './AddPolicyNavigator'
import AuthNavigator from './AuthNavigator'
import TabNavigator from './TabNavigator'

export const RootStackNavigator = StackNavigator(
  {
    Tabs: { screen: TabNavigator },
    Auth: { screen: AuthNavigator },
    ManualAddPolicy: { screen: AddPolicyNavigator },
    PolicyDocument: { screen: PolicyDocumentScreen },
    EmailPolicy: { screen: EmailPolicyScreen },
  },
  {
    initialRouteName: 'Tabs',
    mode: 'modal',
    headerMode: 'screen',
  },
)

interface IProps extends DispatchProp<any> {
  nav: INavReduxState
  auth: IAuthReduxState
}

interface IState {
  initialised: boolean
}

class RootNavigator extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { initialised: false }
  }

  public componentDidMount() {
    const auth = this.props.auth
    const { user, initialised } = auth
    if (initialised) {
      this.configureNavigationStack(user)
    }
  }

  public componentWillReceiveProps(props: IProps) {
    const { user, initialised } = props.auth

    const authDidInitialise = !this.props.auth.initialised && initialised

    if (authDidInitialise) {
      this.configureNavigationStack(user)
    }
  }

  public configureNavigationStack(user: IFirebaseUser | null) {
    if (!user) {
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
    } else if (!user.emailVerified) {
      this.props.dispatch(
        NavigationActions.navigate({
          routeName: 'Auth',
          action: NavigationActions.navigate({
            routeName: 'EmailVerification',
          }),
        }),
      )
    }
    this.delayedInitialisation()
  }

  public delayedInitialisation() {
    // Super hacky way to avoid showing the modal animation - seems to impossible to remove i.e.
    // there is no property you can pass to the navigate action above that disables the animation!
    setTimeout(() => {
      this.setState({
        initialised: true,
      })
    }, 300)
  }

  public render() {
    const { dispatch, nav } = this.props
    const { initialised } = this.state

    // Fade in the root navigation once the login modal is ready.
    if (initialised) {
      return (
        <FadeInView style={{ flex: 1, backgroundColor: BLUE }} duration={300}>
          <RootStackNavigator
            navigation={addNavigationHelpers({ dispatch, state: nav } as any)} // TODO: Fix any cast
          />
        </FadeInView>
      )
    }

    return <LoadingScreen />
  }
}

export default connect((state: IReduxState) => ({
  nav: state.nav,
  auth: state.auth,
}))(RootNavigator)
