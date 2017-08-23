import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

import { Action } from '../../common/types'
import AddPolicyScreenContainer from '../components/AddPolicyScreenContainer'

class FinishedScreen extends React.Component<DispatchProp<Action>> {
  public render() {
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

  private handleNextPress = () => {
    this.props.dispatch(push('/app/tabs/policies'))
  }
}

export default connect()(FinishedScreen)
