// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import type { ReduxState, FirebaseUser, Dispatch } from 'jog/src/types'
import { WHITE } from 'jog/src/constants/palette'
import { signOut } from 'jog/src/data/auth'
import Text from 'jog/src/components/Text'

type AuthButtonProps = {
  user: FirebaseUser | null,
  style: any,
  dispatch: Dispatch
}

class AuthButton extends Component {
  props: AuthButtonProps

  handlePress = () => {
    if (this.props.user) {
      signOut()
    }
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
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

const mapStateToProps = (state: ReduxState) => {
  const user = state.auth.user

  return {
    user,
  }
}

export default connect(
  mapStateToProps,
)(AuthButton)
