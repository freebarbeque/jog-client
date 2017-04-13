// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Car, Plus } from 'jog/src/components/images/index'
import FirebaseImage from 'jog/src/components/FirebaseImage'
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
    return (
      <PolicyCard
        title={`Motor Policy ${this.props.index + 1}`}
        description="Add more details to complete this policy"
        image={(
          <View style={styles.imageWrapper}>
            <FirebaseImage
              width={46}
              imagePath={this.props.policy.companyLogo}
            />
          </View>
        )}
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
    justifyContent: 'center'
  }
})
