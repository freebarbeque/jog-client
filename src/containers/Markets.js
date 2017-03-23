/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, RootReduxState } from '../redux/typedefs'

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

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Markets)
