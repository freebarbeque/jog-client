import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import {
  addCar,
  setCarAnswer,
  setCarAnswers,
} from '../../../common/store/markets/index'
import { IReduxState } from '../../../common/types'

import {
  constructCar,
  deconstructCar,
  ownerQuestions,
  securityQuestions,
  vehicleQuestions,
} from 'jog-common/business/car'
import { ICar, IValidationErrors } from 'jog-common/business/types'
import * as _ from 'lodash'
import { BLUE } from '~/common/constants/palette'
import Logger, { Levels } from '~/common/Logger'
import { QuestionsScreenHeader } from '~/web/components/QuestionsScreenHeader'
import RootContainer from '../../components/Container'
import Panel from '../../components/QuestionPanel'
import QuestionSet from '../../components/Questions/QuestionSet'
import SubmitButton from '../../components/SubmitButton'

const log = new Logger('screens/markets/VehicleScreen', Levels.TRACE)

interface IProps
  extends DispatchProp<any>,
    RouteComponentProps<{ vehicleId?: string }> {
  carAnswers: { [id: string]: ICar }
  cars: { [id: string]: ICar }
}

interface IState {
  errors?: IValidationErrors
  blurred: { [id: string]: boolean }
}

const Container = RootContainer.extend`
  h1,
  h2,
  h3 {
    color: ${BLUE};
  }
`

class VehicleScreen extends React.Component<IProps, IState> {
  private securityQuestionSetComp: QuestionSet<{}> | null
  private ownerQuestionSetComp: QuestionSet<{}> | null
  private vehicleQuestionSetComp: QuestionSet<{}> | null

  public componentDidMount() {
    const vehicleId = this.props.match.params.vehicleId
    if (vehicleId) {
      const car = this.props.cars[vehicleId]
      if (car) {
        this.updateCar(car)
      }
    }
  }

  public componentWillUpdate(nextProps: IProps) {
    const currentVehicleId = this.props.match.params.vehicleId
    const nextVehicleId = nextProps.match.params.vehicleId

    const currentCars = this.props.cars
    const nextCars = nextProps.cars

    const currentCar = currentVehicleId ? currentCars[currentVehicleId] : null
    const nextCar = nextVehicleId ? nextCars[nextVehicleId] : null

    if (currentVehicleId !== nextVehicleId || (!currentCar && nextCar)) {
      if (nextCar) this.updateCar(nextCar)
    }
  }

  public render() {
    const onChange = (id, value) => {
      this.props.dispatch(setCarAnswer(id, value))
    }

    return (
      <div>
        <QuestionsScreenHeader>
          <Container>Add/Edit Vehicle</Container>
        </QuestionsScreenHeader>
        <Container className="VehicleScreen">
          <Panel title="Your Vehicle">
            <QuestionSet
              ref={e => (this.vehicleQuestionSetComp = e)}
              questions={vehicleQuestions}
              extraComponents={{}}
              answers={this.props.carAnswers}
              onChange={onChange}
            />
          </Panel>
          <Panel title="Ownership">
            <QuestionSet
              ref={e => (this.ownerQuestionSetComp = e)}
              questions={ownerQuestions}
              extraComponents={{}}
              answers={this.props.carAnswers}
              onChange={onChange}
            />
          </Panel>
          <Panel title="Security">
            <QuestionSet
              ref={e => (this.securityQuestionSetComp = e)}
              questions={securityQuestions}
              extraComponents={{}}
              answers={this.props.carAnswers}
              onChange={onChange}
            />
          </Panel>
          <SubmitButton label="Add car" onClick={this.handleAddClick} />
        </Container>
      </div>
    )
  }

  private updateCar(car: ICar) {
    if (car) {
      log.trace('Updating car', car)
      const answers = deconstructCar(car)
      this.props.dispatch(setCarAnswers(answers))
    }
  }

  private handleAddClick = () => {
    if (
      this.ownerQuestionSetComp &&
      this.securityQuestionSetComp &&
      this.vehicleQuestionSetComp
    ) {
      const errors = _.merge(
        {},
        this.ownerQuestionSetComp.validateAllFields(),
        this.securityQuestionSetComp.validateAllFields(),
        this.vehicleQuestionSetComp.validateAllFields(),
      )

      if (errors && !errors.hasError) {
        const driver = constructCar(
          this.props.carAnswers,
          this.props.match.params.vehicleId,
        )
        this.props.dispatch(addCar(driver))
      }
    }
  }
}

export default connect((state: IReduxState) => ({
  carAnswers: state.markets.carAnswers,
  cars: state.markets.cars,
}))(VehicleScreen)
