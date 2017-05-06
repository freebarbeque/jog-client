// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import Text from './Text'
import RoundedButton from './RoundedButton'

type AddPolicyScreenContainerProps = {
  title: string,
  onPrevPress?: () => void,
  onNextPress?: () => void,
  children: any,
  enablePrevButton: boolean,
  enableNextButton: boolean,
}

export default class AddPolicyScreenContainer extends Component {
  props: AddPolicyScreenContainerProps

  render() {
    return (
      <View>
        <View>
          <Text>
            POLICY ENTRY
          </Text>
          <Text>
            {this.props.title}
          </Text>
        </View>
        <View>
          {this.props.children}
        </View>
        <View>
          <RoundedButton label="Prev" disabled={this.props.enablePrevButton} />
          <RoundedButton label="Next" disabled={this.props.enableNextButton} />
        </View>
      </View>
    )
  }
}

