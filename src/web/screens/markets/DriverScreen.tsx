import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, ReduxState } from '../../../common/types'
import { addDriver, setDriverAnswer } from '../../../common/store/markets/index'

import Panel from '../../components/Panel'
import Container from '../../components/Container'
import Header from './Header'
import {
  constructDriver,
  questions as driverQuestions,
} from '../../../business/person'
import QuestionSet from '../../components/Questions/QuestionSet'
import { MARGIN } from '../../../common/constants/style'
import RoundedButton from '../../components/RoundedButton'
import { validate } from '../../../business/validation'
import { ValidationErrors } from '../../../business/types'

interface Props {
  driverAnswers: { [id: string]: any }
  dispatch: Dispatch
}

interface State {
  errors?: ValidationErrors
  blurred: { [id: string]: boolean }
}

class DriverScreen extends React.Component<Props> {
  private questionSetComp: QuestionSet

  handleAddClick = () => {
    const errors = this.questionSetComp.validateAllFields()
    if (!errors.hasError) {
      const driver = constructDriver(this.props.driverAnswers)
      this.props.dispatch(addDriver(driver))
    }
  }

  render() {
    return (
      <Container className="DriversScreen">
        <Panel>
          <Header>Driver</Header>
          <QuestionSet
            ref={e => (this.questionSetComp = e)}
            questions={driverQuestions}
            extraComponents={{}}
            answers={this.props.driverAnswers}
            onChange={(id, value) => {
              this.props.dispatch(setDriverAnswer(id, value))
            }}
          />
          <RoundedButton
            label="Add driver"
            style={{
              width: 200,
              fontSize: 16,
              marginLeft: 52,
              marginTop: MARGIN.xxl,
            }}
            onClick={this.handleAddClick}
          />
        </Panel>
      </Container>
    )
  }
}

export default connect((state: ReduxState) => ({
  driverAnswers: state.markets.driverAnswers,
}))(DriverScreen)
