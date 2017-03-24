/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, RootReduxState } from 'redux/typedefs'

type PoliciesProps = {
  dispatch: Dispatch,
};
type PoliciesState = {};

class Policies extends Component {
  props: PoliciesProps
  state: PoliciesState

  constructor(props: PoliciesProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Policies
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
)(Policies)
