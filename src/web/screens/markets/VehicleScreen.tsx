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
  questions as carQuestions,
} from 'jog-common/business/car'
import { ICar, IValidationErrors } from 'jog-common/business/types'
import Logger, { Levels } from '~/common/Logger'
import Container from '../../components/Container'
import Panel from '../../components/Panel'
import QuestionSet from '../../components/Questions/QuestionSet'
import SubmitButton from '../../components/SubmitButton'
import Header from './Header'

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

class VehicleScreen extends React.Component<IProps, IState> {
  private questionSetComp: QuestionSet<{ [id: string]: any }> | null

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
    return (
      <Container className="VehicleScreen">
        <Header>Car</Header>
        <Panel>
          <QuestionSet
            ref={e => (this.questionSetComp = e)}
            questions={carQuestions}
            extraComponents={{}}
            answers={this.props.carAnswers}
            onChange={(id, value) => {
              this.props.dispatch(setCarAnswer(id, value))
            }}
          />
        </Panel>
        <SubmitButton label="Add car" onClick={this.handleAddClick} />
      </Container>
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
    const errors = this.questionSetComp
      ? this.questionSetComp.validateAllFields()
      : null

    if (errors && !errors.hasError) {
      const driver = constructCar(
        this.props.carAnswers,
        this.props.match.params.vehicleId,
      )
      this.props.dispatch(addCar(driver))
    }
  }
}

export default connect((state: IReduxState) => ({
  carAnswers: state.markets.carAnswers,
  cars: state.markets.cars,
}))(VehicleScreen)
