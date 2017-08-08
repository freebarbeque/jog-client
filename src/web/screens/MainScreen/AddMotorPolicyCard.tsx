import * as React from 'react'

import { Plus } from '../../components/images/index'
import PolicyCard from './PolicyCard'

export interface AddMotorPolicyCardProps {
  onPress: () => void
}

export default class AddMotorPolicyCard extends React.Component {
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
