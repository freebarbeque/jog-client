/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import type {
  Dispatch,
  ReduxState,
} from 'jog/src/types'

import Text from '../../components/Text'
import { BLUE } from '../../constants/palette'
import { MARGIN } from '../../constants/style'
import { CarOutline } from '../../components/images/index'
import { NavigationButton } from '../../components/AddPolicyScreenContainer'

type FinishedScreenProps = {
  dispatch: Dispatch,
};

class FinishedScreen extends Component {
  props: FinishedScreenProps

  handleFinishPress = () => {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Thanks, we've set up a basic account for you.</Text>
        <View style={styles.content}>
          {this.props.children}
        </View>
        <View style={{ height: 40, flexDirection: 'row', marginBottom: MARGIN.extraLarge }}>
          <NavigationButton title="Finish" onPress={this.handleFinishPress} />
        </View>
        <View style={styles.footer}>
          <CarOutline scale={1.1} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps,
)(FinishedScreen)

const styles = StyleSheet.create({
  container: {
    padding: MARGIN.large,
    flex: 1,
    backgroundColor: BLUE,
  },
  text: {
    textAlign: 'center',
    fontSize: 21,
    marginTop: MARGIN.extraLarge
  },
  content: {
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGIN.large,
    marginBottom: MARGIN.xxl,
  },
})
