/* @flow */

import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Times } from './images'

type CancelButtonProps = {
  onPress?: () => void,
  style?: $Subtype<Object>,
};

export default class CancelButton extends Component {
  props: CancelButtonProps

  render() {
    return (
      <TouchableOpacity style={{ height: 30, width: 30, ...this.props.style }} onPress={this.props.onPress}>
        <Times scale={1} />
      </TouchableOpacity>
    )
  }
}
