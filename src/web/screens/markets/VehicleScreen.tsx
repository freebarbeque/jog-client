import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { addCar, setCarAnswer } from '../../../common/store/markets/index'
import { ReduxState } from '../../../common/types'

import { constructCar, questions as carQuestions } from '../../../business/car'
import { Car, IValidationErrors } from '../../../business/types'
import { validate } from '../../../business/validation'
import { MARGIN } from '../../../common/constants/style'
import Container from '../../components/Container'
import Panel from '../../components/Panel'
import QuestionSet from '../../components/Questions/QuestionSet'
import RoundedButton from '../../components/RoundedButton'
import Header from './Header'

interface Props extends DispatchProp<any> {
  carAnswers: { [id: string]: Car }
}

interface State {
  errors?: IValidationErrors
  blurred: { [id: string]: boolean }
}

class VehicleScreen extends React.Component<Props> {
  private questionSetComp: QuestionSet

  handleAddClick = () => {
    const errors = this.questionSetComp.validateAllFields()
    if (!errors.hasError) {
      const driver = constructCar(this.props.carAnswers)
      this.props.dispatch(addCar(driver))
    }
  }

  render() {
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
}

export default connect((state: ReduxState) => ({
  carAnswers: state.markets.carAnswers,
}))(VehicleScreen)
