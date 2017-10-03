import * as React from 'react'

import { Plus } from '~/native/components/images/index'

import PolicyCard from './PolicyCard'

export interface IAddMotorPolicyCardProps {
  onPress: () => void
}

export default class AddMotorPolicyCard extends React.Component<
  IAddMotorPolicyCardProps
> {
  public render() {
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
