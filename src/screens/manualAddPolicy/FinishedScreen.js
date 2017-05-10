/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import type {
  Dispatch,
  ReduxState,
} from 'jog/src/types'
import { NavigationActions } from 'react-navigation'

import Text from '../../components/Text'
import { BLUE } from '../../constants/palette'
import { MARGIN } from '../../constants/style'
import { CarOutline } from '../../components/images/index'
import { NavigationButton } from '../../components/AddPolicyScreenContainer'
import { NavReduxState } from '../../types'

type FinishedScreenProps = {
  dispatch: Dispatch,
  nav: NavReduxState
};

class FinishedScreen extends Component {
  props: FinishedScreenProps

  hideModal = () => {
    const routes = this.props.nav.routes
    const manualAddPolicyRoute = _.find(routes, ((route) => route.routeName === 'ManualAddPolicy'))
    const key = manualAddPolicyRoute.key
    this.props.dispatch(NavigationActions.back({ key }))
    // Back to the list of policies
    this.props.dispatch(NavigationActions.back())
  }

  handleFinishPress = () => {
    this.hideModal()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{"Thanks, we've set up a basic account for you."}</Text>
        <View style={styles.content} />
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
  user: state.auth.user,
  nav: state.nav
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
