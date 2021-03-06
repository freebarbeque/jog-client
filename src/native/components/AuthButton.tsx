// @flow

import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'

import { WHITE } from '~/common/constants/palette'
import { logout } from '~/common/store/auth/actions'
import Text from '~/native/components/Text'

interface IProps {
  style: any
}

interface IConnectedProps extends DispatchProp<any>, IProps {}

class AuthButton extends React.Component<IConnectedProps> {
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

const ConnectedAuthButton: React.ComponentClass<IProps> = connect()(AuthButton)

export default ConnectedAuthButton
