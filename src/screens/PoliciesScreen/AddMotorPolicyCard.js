// @flow
import React, { Component } from 'react'

import { Plus } from 'jog/src/components/images/index'

import PolicyCard from './PolicyCard'

export type AddMotorPolicyCardProps = {
  onPress: () => void,
}

export default class AddMotorPolicyCard extends Component {
  props: AddMotorPolicyCardProps

  render() {
    return (
      <PolicyCard
        title="Add a Policy"
        image={<Plus />}
        description="Answer 4 short questions to add a new policy"
        onPress={this.props.onPress}
      />
    )
  }
}
