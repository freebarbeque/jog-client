/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import type { Dispatch, ReduxState } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import Jumbotron from 'jog/src/components/Jumbotron'
import { PINK } from 'jog/src/constants/palette'
import { Background } from 'jog/src/components/images/index'

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
        <Background style={styles.backgroundImage}>
          <View style={styles.backgroundImageOverlay} />
          <Jumbotron />
        </Background>
        <TouchableOpacity style={styles.button} onPress={this.handleGetStartedPress}>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImageOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.25)',
    position: 'absolute',
    top: 0,
    left: 0
  },
  button: {
    backgroundColor: PINK,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const mapStateToProps = (state: ReduxState) => ({
  ...state,
})

export default connect(
  mapStateToProps,
)(GetStartedScreen)
