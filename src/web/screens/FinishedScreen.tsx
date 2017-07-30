import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { Dispatch, Action } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'

interface Props extends DispatchProp<Action> {}

class FinishedScreen extends React.Component<Props> {
  handleNextPress = () => {
    this.props.dispatch(push('/app/tabs/policies'))
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
          <p>We’ve set up a basic account for you.</p>
        </div>
      </AddPolicyScreenContainer>
    )
  }
}

export default connect()(FinishedScreen)