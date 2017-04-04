/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE } from 'jog/src/constants/palette'

type SettingsProps = {
  // dispatch: Dispatch,
  // user: number,
};

type SettingsState = {};

class SettingsScreen extends Component {
  props: SettingsProps
  state: SettingsState

  constructor(props: SettingsProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          Settings
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
)(SettingsScreen)
