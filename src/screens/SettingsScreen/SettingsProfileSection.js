/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from '../../components/Text'

type SettingsProfileSectionProps = {
  dispatch: Dispatch,
};

type SettingsProfileSectionState = {};

class SettingsProfileSection extends Component {
  props: SettingsProfileSectionProps
  state: SettingsProfileSectionState

  constructor(props: SettingsProfileSectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingsProfileSection</Text>
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
)(SettingsProfileSection)
