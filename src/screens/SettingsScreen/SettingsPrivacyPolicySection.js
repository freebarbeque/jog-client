/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from 'jog/src/components/Text'

type SettingsPrivacyPolicySectionProps = {
  dispatch: Dispatch,
};

type SettingsPrivacyPolicySectionState = {};

class SettingsPrivacyPolicySection extends Component {
  props: SettingsPrivacyPolicySectionProps
  state: SettingsPrivacyPolicySectionState

  constructor(props: SettingsPrivacyPolicySectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingsPrivacyPolicySection</Text>
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
)(SettingsPrivacyPolicySection)
