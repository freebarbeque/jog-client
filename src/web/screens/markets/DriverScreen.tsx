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
  employmentQuestions,
  insuranceHistoryQuestions,
  licenseInsuranceQuestions,
  personalDetailsQuestions,
} from 'jog-common/business/driver'
import { IPerson, IValidationErrors } from 'jog-common/business/types'
import * as _ from 'lodash'
import MotoringConvictionQuestion from '~/web/components/MotoringConvictionQuestion'
import MotoringIncidentQuestion from '~/web/components/MotoringIncidentQuestion'
import AddressQuestion from '~/web/components/Questions/AddressQuestion'
import { QuestionsScreenHeader } from '~/web/components/QuestionsScreenHeader'
import Container from '../../components/Container'
import Panel from '../../components/QuestionPanel'
import QuestionSet from '../../components/Questions/QuestionSet'
import SubmitButton from '../../components/SubmitButton'

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
  private licenseQuestionSet: QuestionSet<{}> | null
  private personalDetailsQuestionSet: QuestionSet<{}> | null
  private employmentDetailsQuestionSet: QuestionSet<{}> | null
  private insuranceHistoryQuestionSet: QuestionSet<{}> | null

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
    const answers = this.props.driverAnswers

    const onChange = (id, value) => {
      this.props.dispatch(setDriverAnswer(id, value))
    }

    const extraComponents = {
      'motor/incidents': { component: MotoringIncidentQuestion },
      'motor/convictions': { component: MotoringConvictionQuestion },
      'motor/address': { component: AddressQuestion },
    }

    return (
      <div>
        <QuestionsScreenHeader>
          <Container>Add/Edit Driver</Container>
        </QuestionsScreenHeader>
        <Container className="DriversScreen">
          <Panel title="Personal Details">
            <QuestionSet
              ref={e => (this.personalDetailsQuestionSet = e)}
              questions={personalDetailsQuestions}
              extraComponents={extraComponents}
              answers={answers}
              onChange={onChange}
            />
          </Panel>
          <Panel title="Employment Details">
            <QuestionSet
              ref={e => (this.employmentDetailsQuestionSet = e)}
              questions={employmentQuestions}
              extraComponents={extraComponents}
              answers={answers}
              onChange={onChange}
            />
          </Panel>
          <Panel title="Insurance History">
            <QuestionSet
              ref={e => (this.insuranceHistoryQuestionSet = e)}
              questions={insuranceHistoryQuestions}
              extraComponents={extraComponents}
              answers={answers}
              onChange={onChange}
            />
          </Panel>
          <Panel title="Your License">
            <QuestionSet
              ref={e => (this.licenseQuestionSet = e)}
              questions={licenseInsuranceQuestions}
              extraComponents={extraComponents}
              answers={answers}
              onChange={onChange}
            />
          </Panel>
          <SubmitButton label="Add driver" onClick={this.handleAddClick} />
        </Container>
      </div>
    )
  }

  private updateDriver(car: IPerson) {
    if (car) {
      const answers = deconstructDriver(car)
      this.props.dispatch(setDriverAnswers(answers))
    }
  }

  private handleAddClick = () => {
    if (
      this.employmentDetailsQuestionSet &&
      this.insuranceHistoryQuestionSet &&
      this.licenseQuestionSet &&
      this.personalDetailsQuestionSet
    ) {
      const errors = _.merge(
        {},
        this.employmentDetailsQuestionSet.validateAllFields(),
        this.insuranceHistoryQuestionSet.validateAllFields(),
        this.licenseQuestionSet.validateAllFields(),
        this.personalDetailsQuestionSet.validateAllFields(),
      )

      console.log('errors', errors)

      if (!_.keys(errors).length) {
        const driver = constructDriver(
          this.props.driverAnswers,
          this.props.match.params.driverId,
        )
        this.props.dispatch(addDriver(driver))
      }
    }
  }
}

export default connect((state: IReduxState) => ({
  driverAnswers: state.markets.driverAnswers,
  drivers: state.markets.drivers,
}))(DriverScreen)
