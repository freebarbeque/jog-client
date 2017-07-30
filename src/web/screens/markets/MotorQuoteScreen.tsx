import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, ReduxState } from '../../../common/types'
import { setMotorAnswer } from '../../../common/store/markets/index'

import Panel from '../../components/Panel'
import Container from '../../components/Container'
import AddressQuestion from '../../components/Questions/AddressQuestion'
import Header from './Header'
import { questions as motorQuestions } from '../../../business/motor'
import QuestionSet from '../../components/Questions/QuestionSet'
import MainDriverQuestion from '../../components/Questions/MainDriverQuestion'

type MotorQuoteScreenProps = {
  motorAnswers: { [id: string]: any },
  dispatch: Dispatch,
}

class MotorQuoteScreen extends React.Component<MotorQuoteScreenProps> {
  render() {
    return (
      <Container className="MarketsScreen">
        <Panel>
          <Header>Motor Policy</Header>
          <QuestionSet
            questions={motorQuestions}
            extraComponents={{
              'motor/address': { component: AddressQuestion },
              'motor/main-driver': { component: MainDriverQuestion },
            }}
            answers={this.props.motorAnswers}
            onChange={(id, value) => {
              this.props.dispatch(setMotorAnswer(id, value))
            }}
          />
        </Panel>
      </Container>
    )
  }
}

export default connect((state: ReduxState) => ({
  motorAnswers: state.markets.motorAnswers,
}))(MotorQuoteScreen)
