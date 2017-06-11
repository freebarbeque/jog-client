// @flow
import React, { Component } from 'react'

import PolicyCard from './PolicyCard'
import type { MotorPolicy } from '../../../common/types'
import FirebaseImage from '../../components/FirebaseImage'
import { Car, Plus } from '../../components/images/index'

export type MotorPolicyCardProps = {
  policy: MotorPolicy,
  onPress: () => void,
  index: number,
}

export default class MotorPolicyCard extends Component {
  props: MotorPolicyCardProps

  render() {
    const policy = this.props.policy
    const description = policy.complete
      ? 'Add more details'
      : 'Add more details to complete this policy'

    return (
      <PolicyCard
        title={`Motor Policy ${this.props.index + 1}`}
        description={description}
        image={
          <FirebaseImage alt="" width={46} imagePath={policy.companyLogo} />
        }
        topImage={<Car scale={1.5} />}
        bottomImage={<Plus />}
        onPress={this.props.onPress}
      />
    )
  }
}