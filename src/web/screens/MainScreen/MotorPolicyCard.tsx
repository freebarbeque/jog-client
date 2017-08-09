import * as React from 'react'

import { IMotorPolicy } from '../../../common/types'
import FirebaseImage from '../../components/FirebaseImage'
import { Car, Plus } from '../../components/images/index'
import PolicyCard from './PolicyCard'

export interface IProps {
  policy: IMotorPolicy
  onPress: () => void
  index: number
}

export default class MotorPolicyCard extends React.Component<IProps> {
  public render() {
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
