/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import type { Dispatch, RootReduxState } from '../redux/typedefs'
import { userSubscribe } from '../data/auth'

type RootProps = {
  dummy: number,
  dispatch: Dispatch,
};
type RootState = {};

class Root extends Component {
  props: RootProps
  state: RootState

  constructor(props: RootProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch({
        type: 'DUMMY_ACTION',
        dummy: 10,
      })
    }, 1000)
    userSubscribe((user) => {
      this.props.dispatch({
        type: 'RECEIVE_USER',
        user,
      })
    })
  }

  render() {
    const dummy = this.props.dummy
    return (
      <View style={styles.container}>
        <Text>
          Root: {dummy}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
})

const mapStateToProps = (state: RootReduxState) => {
  const dummy = state.dummy
  return {
    dummy,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root)
