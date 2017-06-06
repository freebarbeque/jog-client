// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Car, Plus } from 'jog/src/native/components/images/index'
import FirebaseImage from 'jog/src/native/components/FirebaseImage'
import type { MotorPolicy } from 'jog/src/types'

import PolicyCard from './PolicyCard'

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
