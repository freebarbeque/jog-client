// @flow
import React, { Component } from 'react'

import PolicyCard from './PolicyCard'
import { Plus } from '../../components/images/index'

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
