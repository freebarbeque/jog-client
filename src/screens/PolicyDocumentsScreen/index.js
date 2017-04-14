/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'

type PolicyDocumentsScreenProps = {
  // dispatch: Dispatch,
  // user: number,
};

class PolicyDocumentsScreen extends Component {
  props: PolicyDocumentsScreenProps

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          Documents will go here
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
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
)(PolicyDocumentsScreen)
