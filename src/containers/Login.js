/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, RootReduxState } from '../redux/typedefs'

type LoginProps = {
  dispatch: Dispatch,
};
type LoginState = {};

class Login extends Component {
  props: LoginProps
  state: LoginState

  constructor(props: LoginProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        Login
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
)(Login)
