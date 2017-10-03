import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { IMotorPolicy } from '~/common/types'
import FirebaseImage from '~/native/components/FirebaseImage'
import { Car, Plus } from '~/native/components/images/index'

import PolicyCard from './PolicyCard'

export interface IMotorPolicyCardProps {
  policy: IMotorPolicy
  onPress: () => void
  index: number
}

export default class MotorPolicyCard extends React.Component<
  IMotorPolicyCardProps
> {
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
          <View style={styles.imageWrapper}>
            <FirebaseImage width={46} imagePath={policy.companyLogo} />
          </View>
        }
        topImage={<Car />}
        bottomImage={<Plus />}
        onPress={this.props.onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
