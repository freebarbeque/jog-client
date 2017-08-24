import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import {
  addDriver,
  setDriverAnswer,
  setDriverAnswers,
} from '../../../common/store/markets/index'
import { IReduxState } from '../../../common/types'

import {
  constructDriver,
  deconstructDriver,
  questions as driverQuestions,
} from 'jog-common/business/driver'
import { IPerson, IValidationErrors } from 'jog-common/business/types'
import { MARGIN } from '../../../common/constants/style'
import Container from '../../components/Container'
import Panel from '../../components/Panel'
import QuestionSet from '../../components/Questions/QuestionSet'
import RoundedButton from '../../components/RoundedButton'
import Header from './Header'

interface IProps
  extends DispatchProp<any>,
    RouteComponentProps<{ driverId?: string }> {
  driverAnswers: { [id: string]: any }
  drivers: { [id: string]: IPerson }
}

interface IState {
  errors?: IValidationErrors
  blurred: { [id: string]: boolean }
}

class DriverScreen extends React.Component<IProps, IState> {
  private questionSetComp: QuestionSet | null

  public componentDidMount() {
    const driverId = this.props.match.params.driverId
    if (driverId) {
      const driver = this.props.drivers[driverId]
      if (driver) {
        this.updateDriver(driver)
      }
    }
  }

  public componentWillUpdate(nextProps: IProps) {
    const currentDriverId = this.props.match.params.driverId
    const nextDriverId = nextProps.match.params.driverId

    const currentDrivers = this.props.drivers
    const nextDrivers = nextProps.drivers

    const currentDriver = currentDriverId
      ? currentDrivers[currentDriverId]
      : null
    const nextDriver = nextDriverId ? nextDrivers[nextDriverId] : null

    if (currentDriverId !== nextDriverId || (!currentDriver && nextDriver)) {
      if (nextDriver) this.updateDriver(nextDriver)
    }
  }

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

  private updateDriver(car: IPerson) {
    if (car) {
      const answers = deconstructDriver(car)
      this.props.dispatch(setDriverAnswers(answers))
    }
  }

  private handleAddClick = () => {
    if (!this.questionSetComp) throw new Error('No question set?')

    const errors = this.questionSetComp.validateAllFields()
    if (!errors.hasError) {
      const driver = constructDriver(
        this.props.driverAnswers,
        this.props.match.params.driverId,
      )
      this.props.dispatch(addDriver(driver))
    }
  }
}

export default connect((state: IReduxState) => ({
  driverAnswers: state.markets.driverAnswers,
  drivers: state.markets.drivers,
}))(DriverScreen)
