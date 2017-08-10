import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { addDriver, setDriverAnswer } from '../../../common/store/markets/index'
import { Dispatch, IReduxState } from '../../../common/types'

import {
  constructDriver,
  questions as driverQuestions,
} from 'jog-common/business/driver'
import { IValidationErrors } from 'jog-common/business/types'
import { validate } from 'jog-common/business/validation'
import { MARGIN } from '../../../common/constants/style'
import Container from '../../components/Container'
import Panel from '../../components/Panel'
import QuestionSet from '../../components/Questions/QuestionSet'
import RoundedButton from '../../components/RoundedButton'
import Header from './Header'

interface IProps extends DispatchProp<any> {
  driverAnswers: { [id: string]: any }
}

interface IState {
  errors?: IValidationErrors
  blurred: { [id: string]: boolean }
}

class DriverScreen extends React.Component<IProps> {
  private questionSetComp: QuestionSet | null

  public render() {
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

  private handleAddClick = () => {
    if (!this.questionSetComp) throw new Error('No question set?')

    const errors = this.questionSetComp.validateAllFields()
    if (!errors.hasError) {
      const driver = constructDriver(this.props.driverAnswers)
      this.props.dispatch(addDriver(driver))
    }
  }
}

export default connect((state: IReduxState) => ({
  driverAnswers: state.markets.driverAnswers,
}))(DriverScreen)
