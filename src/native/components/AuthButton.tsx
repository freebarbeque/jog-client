// @flow

import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'

import { WHITE } from '~/common/constants/palette'
import { logout } from '~/common/store/auth/actions'
import { Dispatch } from '~/common/types'
import Text from '~/native/components/Text'

interface IAuthButtonProps extends DispatchProp<any> {
  style: any
}

class AuthButton extends React.Component<IAuthButtonProps> {
  public render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.handlePress}>
        <View>
          <Text style={{ color: WHITE }}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    )
  }

  private handlePress = () => {
    this.props.dispatch(logout())
  }
}

export default connect()(AuthButton)
