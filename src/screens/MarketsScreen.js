/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, RootReduxState } from 'jog/src/redux/typedefs'

type MarketsProps = {
  dispatch: Dispatch,
};
type MarketsState = {};

class Markets extends Component {
  props: MarketsProps
  state: MarketsState

  constructor(props: MarketsProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>
          Markets
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

export default connect(
  mapStateToProps,
)(Markets)
