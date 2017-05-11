/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from '../../components/Text'

type SettingsTermsAndConditionsSectionProps = {
  dispatch: Dispatch,
};

type SettingsTermsAndConditionsSectionState = {};

class SettingsTermsAndConditionsSection extends Component {
  props: SettingsTermsAndConditionsSectionProps
  state: SettingsTermsAndConditionsSectionState

  constructor(props: SettingsTermsAndConditionsSectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingsTermsAndConditionsSection</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const mapStateToProps = (state: ReduxState) => {
  return {
    ...state
  }
}

export default connect(
  mapStateToProps,
)(SettingsTermsAndConditionsSection)
