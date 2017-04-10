/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type {
  Dispatch,
} from 'jog/src/types'

import { clear } from 'jog/src/redux/screens/auth/actions'
import AccessoryButton from 'jog/src/components/AccessoryButton'
import { BLUE, PINK } from '../constants/palette'
import Text from '../components/Text'
import { MARGIN } from '../constants/style'
import { Logo } from '../components/images/index'

type AuthHomeProps = {
  dispatch: Dispatch,
  loading: boolean,
};

class AuthHomeScreen extends Component {
  props: AuthHomeProps

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clear())
  }

  handleLoginPress = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Login'
    }))
  }

  handleRegisterNowPress = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Register'
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Logo
            style={{ marginBottom: MARGIN.large }}
            scale={1.5}
          />
        </View>
        <View style={styles.jumbotron}>
          <Text style={styles.headerText}>
            your
          </Text>
          <Text style={styles.headerText}>
            insurance
          </Text>
          <Text style={styles.headerText}>
            memory
          </Text>
          <View style={styles.divider} />
          <Text style={styles.listText}>
            store your policies
          </Text>
          <Text style={styles.listText}>
            minimise your premiums
          </Text>
        </View>
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
  divider: {
    width: 25,
    height: 4,
    backgroundColor: PINK,
    marginTop: MARGIN.large,
    marginBottom: MARGIN.large
  },
  jumbotron: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: MARGIN.large,
    paddingBottom: MARGIN.extraLarge
  },
  headerText: {
    fontSize: 36,
    fontWeight: '600',
    lineHeight: 36,
  },
  listText: {
    fontSize: 16
  },
  menu: {
    alignItems: 'center',
    marginTop: MARGIN.large,
  },
  menuButton: {
    marginBottom: MARGIN.base
  },
  menuButtonText: {
    fontSize: 16
  }
})

export default connect()(AuthHomeScreen)
