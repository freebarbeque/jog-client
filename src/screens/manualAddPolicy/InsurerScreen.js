/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import type {
  Dispatch,
  ReduxState,
  NavReduxState
} from 'jog/src/types'

import AddPolicyScreenContainer from '../../components/AddPolicyScreenContainer'
import Text from '../../components/Text'

type InsurerScreenProps = {
  dispatch: Dispatch,
  nav: NavReduxState
};

class InsurerScreen extends Component {
  props: InsurerScreenProps

  handleNextPress = () => {
    // TODO
  }

  render() {
    return (
      <AddPolicyScreenContainer
        enableNextButton={false}
        enablePrevButton={false}
        title={'Who is your insurer?'}
        onNextPress={this.handleNextPress}
      >
        <Text >Yo!</Text>
      </AddPolicyScreenContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  nav: state.nav
})

export default connect(
  mapStateToProps,
)(InsurerScreen)
