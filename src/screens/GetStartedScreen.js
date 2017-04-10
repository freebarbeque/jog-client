/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import type { Dispatch, ReduxState } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import Jumbotron from '../components/Jumbotron'

type GetStartedScreenProps = {
  dispatch: Dispatch,
};

class GetStartedScreen extends Component {
  props: GetStartedScreenProps

  handleGetStartedPress = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Policies' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Jumbotron />
        <TouchableOpacity onPress={this.handleGetStartedPress}>
          <View>
            <Text>
              Add your motor policy to get started
            </Text>
          </View>
        </TouchableOpacity>
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
  ...state,
})

export default connect(
  mapStateToProps,
)(GetStartedScreen)
