/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from 'jog/src/components/Text'

type SettingsAboutUsSectionProps = {
  dispatch: Dispatch,
};

type SettingsAboutUsSectionState = {};

class SettingsAboutUsSection extends Component {
  props: SettingsAboutUsSectionProps
  state: SettingsAboutUsSectionState

  constructor(props: SettingsAboutUsSectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingsAboutUsSection</Text>
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
)(SettingsAboutUsSection)
