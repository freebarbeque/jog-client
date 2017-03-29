// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TouchableHighlight } from 'react-native'
import { NavigationActions } from 'react-navigation'

import type { RootReduxState } from 'jog/src/redux/typedefs'
import type { User } from 'jog/src/data/typedefs'
import { WHITE } from 'jog/src/constants/palette'

type AuthButtonProps = {
  user: User | null,
  style: any,
  dispatch: Function
}

class AuthButton extends Component {
  props: AuthButtonProps

  handlePress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  render() {
    return (
      <TouchableHighlight style={this.props.style} onPress={this.handlePress}>
        <Text style={{ color: WHITE }}>
          {this.props.user ? 'Sign Out' : 'Sign In'}
        </Text>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state: RootReduxState) => {
  const user = state.auth.user

  return {
    user,
  }
}
export default connect(
  mapStateToProps,
)(AuthButton)
