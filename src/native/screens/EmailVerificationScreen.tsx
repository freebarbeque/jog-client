import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { IFirebaseUser, INavReduxState, IReduxState } from '~/common/types'

import * as _ from 'lodash'
import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import {
  pollRefreshUser,
  stopPollingRefreshUser,
} from '~/common/store/auth/actions'
import { emailVerification } from '~/common/store/screens/auth/actions'
import RoundedButton from '~/native/components/RoundedButton'
import Text from '~/native/components/Text'

interface IEmailVerificationScreenProps extends DispatchProp<any> {
  user: IFirebaseUser | null
  loading: boolean
  nav: INavReduxState
}

class EmailVerificationScreen extends React.Component<
  IEmailVerificationScreenProps
> {
  public componentDidMount() {
    this.props.dispatch(pollRefreshUser())
  }

  public componentWillReceiveProps(props: IEmailVerificationScreenProps) {
    const user = props.user
    if (user && user.emailVerified) {
      this.hideModal()
    }
  }

  public componentWillUnmount() {
    this.props.dispatch(stopPollingRefreshUser())
  }

  public render() {
    const window = Dimensions.get('window')
    const windowWidth = window.width

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            width: windowWidth,
            justifyContent: 'center',
          }}
        >
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.title}>Email Verification</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.description}>
                We just sent you a verification email. Click the link to
                activate your account
              </Text>
            </View>
          </View>
          <RoundedButton
            style={{ marginTop: MARGIN.large }}
            label={'Resend'}
            onPress={this.handleResendClick}
            loading={this.props.loading}
          />
        </View>
      </View>
    )
  }

  private hideModal = () => {
    const routes = this.props.nav.routes
    const authRoute = _.find(routes, route => route.routeName === 'Auth')
    if (authRoute) {
      const key = authRoute.key
      this.props.dispatch(NavigationActions.back({ key }))
    } else {
      throw new Error('No route with routeName Auth')
    }
  }

  private handleResendClick = () => {
    const user = this.props.user
    if (user) {
      this.props.dispatch(emailVerification(user))
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingTop: 20,
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerLogo: {
    marginTop: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 20,
    fontWeight: '400',
  },
  description: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
  },
})

const mapStateToProps = (state: IReduxState) => ({
  user: state.auth.user,
  loading: state.screens.auth.loading,
  nav: state.nav,
})

export default connect(mapStateToProps)(EmailVerificationScreen)
