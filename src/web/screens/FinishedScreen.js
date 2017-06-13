/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import type { Dispatch } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'

type FinishedScreenProps = {
  dispatch: Dispatch,
}

class FinishedScreen extends Component {
  props: FinishedScreenProps

  handleNextPress = () => {
    this.props.dispatch(push('/app'))
  }

  render() {
    return (
      <AddPolicyScreenContainer
        showNextButton
        showPrevButton={false}
        onNextPress={this.handleNextPress}
        nextLabel="Finish"
      >
        <div style={{ textAlign: 'center', maxWidth: 200 }}>
          <p>Thanks!</p>
          <p>
            We’ve set up a basic
            account for you.
          </p>
        </div>
      </AddPolicyScreenContainer>
    )
  }
}

export default connect()(FinishedScreen)
