import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { addCar, setCarAnswer } from '../../../common/store/markets/index'
import { IReduxState } from '../../../common/types'

import {
  constructCar,
  questions as carQuestions,
} from 'jog-common/business/car'
import { ICar, IValidationErrors } from 'jog-common/business/types'
import { validate } from 'jog-common/business/validation'
import { MARGIN } from '../../../common/constants/style'
import Container from '../../components/Container'
import Panel from '../../components/Panel'
import QuestionSet from '../../components/Questions/QuestionSet'
import RoundedButton from '../../components/RoundedButton'
import Header from './Header'

interface IProps extends DispatchProp<any> {
  carAnswers: { [id: string]: ICar }
}

interface IState {
  errors?: IValidationErrors
  blurred: { [id: string]: boolean }
}

class VehicleScreen extends React.Component<IProps> {
  private questionSetComp: QuestionSet | null

  public render() {
    return (
      <Container className="VehicleScreen">
        <Panel>
          <Header>Car</Header>
          <QuestionSet
            ref={e => (this.questionSetComp = e)}
            questions={carQuestions}
            extraComponents={{}}
            answers={this.props.carAnswers}
            onChange={(id, value) => {
              this.props.dispatch(setCarAnswer(id, value))
            }}
          />
          <RoundedButton
            label="Add car"
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
    const errors = this.questionSetComp
      ? this.questionSetComp.validateAllFields()
      : null
    if (errors && !errors.hasError) {
      const driver = constructCar(this.props.carAnswers)
      this.props.dispatch(addCar(driver))
    }
  }
}

export default connect((state: IReduxState) => ({
  carAnswers: state.markets.carAnswers,
}))(VehicleScreen)
