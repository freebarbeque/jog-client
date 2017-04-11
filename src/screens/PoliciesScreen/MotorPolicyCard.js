// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import { Car, Plus } from 'jog/src/components/images/index'
import type { MotorPolicy, ReduxState, InsurerMap } from 'jog/src/types'

import PolicyCard from './PolicyCard'
import FirebaseImage from '../../components/FirebaseImage'

export type MotorPolicyCardProps = {
  policy: MotorPolicy,
  onPress: () => void,
  index: number,
  // eslint-disable-next-line react/no-unused-prop-types
  insurers?: InsurerMap
}

export type MotorPolicyCardState = {
  imagePath: string | null
}

class MotorPolicyCard extends Component {
  props: MotorPolicyCardProps
  state: MotorPolicyCardState

  constructor(props: MotorPolicyCardProps) {
    super(props)
    this.state = {
      imagePath: null
    }
  }

  componentDidMount() {
    this.fetchCompanyLogo(this.props)
  }

  componentWillReceiveProps(props: MotorPolicyCardProps) {
    const companyChanged = props.policy.companyId !== this.props.policy.companyId
    if (companyChanged) {
      this.fetchCompanyLogo(props)
    }
  }

  fetchCompanyLogo(props: MotorPolicyCardProps) {
    const companyId = props.policy.companyId
    const logo = _.get(props.insurers, [companyId, 'logo']) || null
    this.setState({ imagePath: logo })
  }

  render() {
    return (
      <PolicyCard
        title={`Motor Policy ${this.props.index + 1}`}
        description="Add more details to complete this policy"
        image={(
          <View style={styles.imageWrapper}>
            <FirebaseImage
              width={46}
              imagePath={this.state.imagePath}
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

const mapStateToProps = (state: ReduxState) => ({ insurers: state.insurers.insurers })

export default connect(mapStateToProps)(MotorPolicyCard)

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
