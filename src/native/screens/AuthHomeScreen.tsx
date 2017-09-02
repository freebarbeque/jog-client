import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { clear } from '~/common/store/screens/auth/actions'
import AccessoryButton from '~/native/components/AccessoryButton'
import { Logo } from '../components/images/index'

import Jumbotron from '../components/Jumbotron'

interface IAuthHomeProps extends DispatchProp<any> {
  loading: boolean
}

class AuthHomeScreen extends React.Component<IAuthHomeProps> {
  public componentWillUnmount() {
    this.props.dispatch(clear())
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Logo style={{ marginBottom: MARGIN.base }} scale={1.5} />
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

  private handleLoginPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Login',
      }),
    )
  }

  private handleRegisterNowPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'Register',
      }),
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
