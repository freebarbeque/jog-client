// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'

import type { Dispatch } from 'jog/src/types'
import { WHITE } from 'jog/src/constants/palette'
import Text from 'jog/src/components/Text'
import { logout } from '../store/auth/actions'

type AuthButtonProps = {
  style: any,
  dispatch: Dispatch
}

class AuthButton extends Component {
  props: AuthButtonProps

  handlePress = () => {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this.handlePress}
      >
        <View>
          <Text style={{ color: WHITE }}>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect()(AuthButton)
