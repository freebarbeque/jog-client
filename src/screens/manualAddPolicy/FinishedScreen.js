/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { View } from 'react-native'

import type {
  Dispatch,
  ReduxState,
} from 'jog/src/types'

import type { ManualPolicyUpdate } from '../../store/screens/addManualPolicy/actions'
import { updateManualPolicy, clearManualPolicy } from '../../store/screens/addManualPolicy/actions'
import Text from '../../components/Text'

type FinishedScreenProps = {
  dispatch: Dispatch,
  policy: ManualPolicyUpdate,
};

class FinishedScreen extends Component {
  props: FinishedScreenProps

  componentWillUnmount() {
    this.props.dispatch(clearManualPolicy())
  }

  handleNextPress = () => {
    // TODO
  }

  onChange = ({ value }) => {
    this.props.dispatch(updateManualPolicy({ companyId: value }))
  }

  render() {
    return (
      <View>
        <Text>Thanks!</Text>
      </View>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policy: state.screens.addManualPolicy
})

export default connect(
  mapStateToProps,
)(FinishedScreen)
