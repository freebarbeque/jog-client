/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type { Dispatch } from 'jog/src/types'

import { clear } from 'jog/src/store/screens/auth/actions'
import AccessoryButton from 'jog/src/components/AccessoryButton'
import { BLUE } from '../constants/palette'
import { MARGIN } from '../constants/style'
import { Logo } from '../components/images/index'
import Jumbotron from '../components/Jumbotron'

type AuthHomeProps = {
  dispatch: Dispatch,
  loading: boolean,
}

class AuthHomeScreen extends Component {
  props: AuthHomeProps

  componentWillUnmount() {
    this.props.dispatch(clear())
  }

  handleLoginPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
      }),
    )
  }

  handleRegisterNowPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Register',
      }),
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Logo style={{ marginBottom: MARGIN.large }} scale={1.5} />
        </View>
        <Jumbotron />
        <View style={styles.menu}>
          <AccessoryButton
            label="login"
            onPress={this.handleLoginPress}
            disabled={this.props.loading}
            style={styles.menuButton}
            textStyle={styles.menuButtonText}
          />
          <AccessoryButton
            label="register now"
            onPress={this.handleRegisterNowPress}
            disabled={this.props.loading}
            style={styles.menuButton}
            textStyle={styles.menuButtonText}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BLUE,
  },
  menu: {
    alignItems: 'center',
    marginTop: MARGIN.large,
  },
  menuButton: {
    marginBottom: MARGIN.base,
  },
  menuButtonText: {
    fontSize: 16,
  },
})

export default connect()(AuthHomeScreen)
