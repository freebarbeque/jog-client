// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TouchableHighlight } from 'react-native'

import type { RootReduxState } from '../redux/typedefs'
import type { User } from '../data/typedefs'
import { WHITE } from '../constants/palette'

type AuthButtonProps = {
  user: User | null,
  style: any,
}

class AuthButton extends Component {
  props: AuthButtonProps

  handlePress() {
    if (this.props.user) {
      // TODO: Logout
    } else {
      // TODO: Login modal
    }
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
  const user = state.user
  return {
    user,
  }
}
export default connect(
  mapStateToProps,
)(AuthButton)
