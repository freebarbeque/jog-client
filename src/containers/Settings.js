/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, RootReduxState } from '../redux/typedefs'

type SettingsProps = {
  dispatch: Dispatch,
};
type SettingsState = {};

class Settings extends Component {
  props: SettingsProps
  state: SettingsState

  constructor(props: SettingsProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
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

const mapStateToProps = (state: RootReduxState) => ({
  ...state,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)
