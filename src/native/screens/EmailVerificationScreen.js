/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type {
  Dispatch,
  ReduxState,
  FirebaseUser,
  ReactNavProp,
} from 'jog/src/common/types'

import { BLUE } from 'jog/src/common/constants/palette'
import Text from 'jog/src/native/components/Text'
import { MARGIN } from 'jog/src/common/constants/style'
import RoundedButton from 'jog/src/native/components/RoundedButton'
import { emailVerification } from 'jog/src/common/store/screens/auth/actions'
import {
  pollRefreshUser,
  stopPollingRefreshUser,
} from 'jog/src/common/store/auth/actions'

type EmailVerificationScreenProps = {
  dispatch: Dispatch,
  user: FirebaseUser | null,
  loading: boolean,
  nav: ReactNavProp,
}

class EmailVerificationScreen extends Component {
  props: EmailVerificationScreenProps

  componentDidMount() {
    this.props.dispatch(pollRefreshUser())
  }

  componentWillReceiveProps(props: EmailVerificationScreenProps) {
    const user = props.user
    if (user && user.emailVerified) {
      this.hideModal()
    }
  }

  componentWillUnmount() {
    this.props.dispatch(stopPollingRefreshUser())
  }

  hideModal = () => {
    const routes = this.props.nav.routes
    const authRoute = _.find(routes, route => route.routeName === 'Auth')
    const key = authRoute.key
    this.props.dispatch(NavigationActions.back({ key }))
  }

  handleResendClick = () => {
    const user = this.props.user
    if (user) {
      this.props.dispatch(emailVerification(user))
    }
  }

  render() {
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
              <Text style={styles.title}>
                Email Verification
              </Text>
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

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  loading: state.screens.auth.loading,
  nav: state.nav,
})

export default connect(mapStateToProps)(EmailVerificationScreen)
