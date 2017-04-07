/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, ReduxState } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'

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
        <Text style={{ color: BLUE }}>
          Markets
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.base
  },
})

const mapStateToProps = (state: ReduxState) => ({
  ...state,
})

export default connect(
  mapStateToProps,
)(Markets)
