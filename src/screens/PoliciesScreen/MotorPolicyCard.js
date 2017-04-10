// @flow
import React, { Component } from 'react'
import type { MotorPolicy } from '../../types'
import PolicyCard from './PolicyCard'
import { Admiral, Car, Plus } from '../../components/images/index'

export type MotorPolicyCardProps = {
  policy: MotorPolicy,
  onPress: () => void,
  index: number
}

export default class MotorPolicyCard extends Component {
  props: MotorPolicyCardProps

  render() {
    return (
      <PolicyCard
        title={`Motor Policy ${this.props.index + 1}`}
        description="Add more details to complete this policy"
        image={<Admiral />}
        topImage={<Car />}
        bottomImage={<Plus />}
        onPress={this.props.onPress}
      />
    )
  }
}

