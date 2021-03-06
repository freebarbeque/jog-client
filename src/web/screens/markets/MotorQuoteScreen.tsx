import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import {
  setMotorAnswer,
  setMotorAnswers,
} from '../../../common/store/markets/index'
import { IReduxState } from '../../../common/types'

import {
  constructAnswers,
  constructQuoteRequest,
  insuranceQuestions,
  youAndYourCarQuestions,
} from 'jog-common/business/motor'

import { IQuoteRequest } from 'jog-common/business/types'
import * as _ from 'lodash'
import { RouteComponentProps, withRouter } from 'react-router'
import { BLUE } from '~/common/constants/palette'
import { QuestionsScreenHeader } from '~/web/components/QuestionsScreenHeader'
import { addQuoteRequest } from '../../../common/store/markets/quoteRequests'
import RootContainer from '../../components/Container'
import Panel from '../../components/QuestionPanel'
import AddressQuestion from '../../components/Questions/AddressQuestion'
import MainDriverQuestion from '../../components/Questions/MainDriverQuestion'
import QuestionSet from '../../components/Questions/QuestionSet'
import VehicleQuestion from '../../components/Questions/VehicleQuestion'
import SubmitButton from '../../components/SubmitButton'

const Container = RootContainer.extend`
  h1 {
    color: ${BLUE};
  }
`

interface IMotorQuoteScreenProps
  extends DispatchProp<any>,
    RouteComponentProps<{ policyId: string }> {
  motorAnswers: { [id: string]: any }
  quoteRequests: { [id: string]: IQuoteRequest }
}

class MotorQuoteScreen extends React.Component<IMotorQuoteScreenProps> {
  private youAndYourCarQuestionSet: QuestionSet<{ [id: string]: any }> | null
  private insuranceQuestionSet: QuestionSet<{ [id: string]: any }> | null

  public componentDidMount() {
    const policyId = this.props.match.params.policyId
    if (policyId) {
      const qr = this.props.quoteRequests[policyId]
      this.updateAnswers(qr)
    } else {
      this.updateAnswers()
    }
  }

  public componentWillReceiveProps(nextProps: IMotorQuoteScreenProps) {
    const newQuoteId = nextProps.match.params.policyId
    const oldQuoteId = this.props.match.params.policyId
    const newQuote = nextProps.quoteRequests[newQuoteId]
    const oldQuote = this.props.quoteRequests[oldQuoteId]

    const fetchedQuotes = Boolean(!oldQuote && newQuote)
    const quoteChanged = newQuoteId !== oldQuoteId

    if (quoteChanged || fetchedQuotes) {
      this.updateAnswers(newQuote)
    }
  }

  public render() {
    const policyId = this.props.match.params.policyId
    const extraComponents = {
      'motor/address': { component: AddressQuestion, props: { policyId } },
      'motor/main-driver': {
        component: MainDriverQuestion,
        props: { policyId },
      },
      'motor/vehicle': { component: VehicleQuestion, props: { policyId } },
    }

    return (
      <div>
        <QuestionsScreenHeader>
          <Container>Motor Policy</Container>
        </QuestionsScreenHeader>
        <Container className="MarketsScreen">
          <Panel title="You and your car">
            <QuestionSet
              ref={e => (this.youAndYourCarQuestionSet = e)}
              questions={youAndYourCarQuestions}
              extraComponents={extraComponents}
              answers={this.props.motorAnswers}
              onChange={this.onChange}
            />
          </Panel>
          <Panel title="Your policy">
            <QuestionSet
              ref={e => (this.insuranceQuestionSet = e)}
              questions={insuranceQuestions}
              extraComponents={extraComponents}
              answers={this.props.motorAnswers}
              onChange={this.onChange}
            />
          </Panel>
          <SubmitButton label="Submit" onClick={this.handleSubmit} />
        </Container>
      </div>
    )
  }

  private onChange = (id, value) => {
    this.props.dispatch(setMotorAnswer(id, value))
    const policyId: string | undefined = this.props.match.params.policyId
    const motorAnswers = { ...this.props.motorAnswers }
    motorAnswers[id] = value
    this.saveQuote(policyId, motorAnswers)
  }

  private updateAnswers(qr?: IQuoteRequest | null) {
    if (qr) {
      const answers = constructAnswers(qr)
      this.props.dispatch(setMotorAnswers(answers))
    } else {
      this.props.dispatch(setMotorAnswers({}))
    }
  }

  private saveQuote(policyId, answers, submit: boolean = false) {
    const qr = constructQuoteRequest(answers, policyId)
    if (submit) {
      // Submit the quote for processing by API
      qr.status = 'pending'
    }
    this.props.dispatch(addQuoteRequest(qr, policyId, submit))
  }

  private handleSubmit = () => {
    // TODO: Mark as pending as opposed to incomplete, as it has now passed validation.
    if (!(this.insuranceQuestionSet && this.youAndYourCarQuestionSet))
      throw new Error(
        'How is submit being pressed before everything is mounted?',
      )

    const errors = _.merge(
      {},
      this.insuranceQuestionSet.validateAllFields(),
      this.youAndYourCarQuestionSet.validateAllFields(),
    )

    if (!_.keys(errors).length) {
      this.saveQuote(
        this.props.match.params.policyId,
        this.props.motorAnswers,
        true,
      )
    } else {
      console.log('has error', errors)
    }
  }
}

export default connect((state: IReduxState) => ({
  motorAnswers: state.markets.motorAnswers,
  quoteRequests: state.markets.quoteRequests,
}))(withRouter(MotorQuoteScreen))
