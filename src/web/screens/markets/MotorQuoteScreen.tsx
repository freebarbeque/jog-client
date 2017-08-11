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
  questions as motorQuestions,
} from 'jog-common/business/motor'
import { IQuoteRequest } from 'jog-common/business/types'
import { RouteComponentProps, withRouter } from 'react-router'
import { MARGIN } from '../../../common/constants/style'
import { addQuoteRequest } from '../../../common/store/markets/quoteRequests'
import Container from '../../components/Container'
import Panel from '../../components/Panel'
import AddressQuestion from '../../components/Questions/AddressQuestion'
import MainDriverQuestion from '../../components/Questions/MainDriverQuestion'
import QuestionSet from '../../components/Questions/QuestionSet'
import VehicleQuestion from '../../components/Questions/VehicleQuestion'
import RoundedButton from '../../components/RoundedButton'
import Header from './Header'

interface IMotorQuoteScreenProps
  extends DispatchProp<any>,
    RouteComponentProps<{ quoteId: string }> {
  motorAnswers: { [id: string]: any }
  quoteRequests: { [id: string]: IQuoteRequest }
}

class MotorQuoteScreen extends React.Component<IMotorQuoteScreenProps> {
  private questionSetComp: QuestionSet | null

  public componentDidMount() {
    const quoteId = this.props.match.params.quoteId
    if (quoteId) {
      const qr = this.props.quoteRequests[quoteId]
      if (qr) {
        this.updateAnswers(qr)
      }
    }
  }

  public componentWillReceiveProps(nextProps: IMotorQuoteScreenProps) {
    const newQuoteId = nextProps.match.params.quoteId
    const oldQuoteId = this.props.match.params.quoteId
    const newQuote = nextProps.quoteRequests[newQuoteId]
    const oldQuote = this.props.quoteRequests[oldQuoteId]

    const fetchedQuotes = Boolean(!oldQuote && newQuote)
    const quoteChanged = newQuoteId !== oldQuoteId

    console.log('quoteChanged', quoteChanged)
    console.log('fetchedQuotes', fetchedQuotes)

    if (quoteChanged || fetchedQuotes) {
      this.updateAnswers(newQuote)
    }
  }

  public render() {
    return (
      <Container className="MarketsScreen">
        <Panel>
          <Header>Motor Policy</Header>
          <QuestionSet
            ref={e => (this.questionSetComp = e)}
            questions={motorQuestions}
            extraComponents={{
              'motor/address': { component: AddressQuestion },
              'motor/main-driver': { component: MainDriverQuestion },
              'motor/vehicle': { component: VehicleQuestion },
            }}
            answers={this.props.motorAnswers}
            onChange={this.onChange}
          />
          <RoundedButton
            label="Submit"
            style={{
              width: 200,
              fontSize: 16,
              marginLeft: 52,
              marginTop: MARGIN.xxl,
            }}
            onClick={this.handleSubmit}
          />
        </Panel>
      </Container>
    )
  }

  private onChange = (id, value) => {
    this.props.dispatch(setMotorAnswer(id, value))
    const quoteId: string | undefined = this.props.match.params.quoteId
    const motorAnswers = { ...this.props.motorAnswers }
    motorAnswers[id] = value
    this.saveQuote(quoteId, motorAnswers)
  }

  private updateAnswers(qr: IQuoteRequest) {
    const answers = constructAnswers(qr)
    this.props.dispatch(setMotorAnswers(answers))
  }

  private saveQuote(quoteId, answers, submit: boolean = false) {
    const qr = constructQuoteRequest(answers, quoteId)
    if (submit) {
      // Submit the quote for processing by API
      qr.status = 'pending'
    }
    this.props.dispatch(addQuoteRequest(qr, quoteId, submit))
  }

  private handleSubmit = () => {
    // TODO: Mark as pending as opposed to incomplete, as it has now passed validation.
    if (!this.questionSetComp)
      throw new Error(
        'How is submit being pressed before everything is mounted?',
      )
    const errors = this.questionSetComp.validateAllFields()
    if (!errors.hasError) {
      this.saveQuote(
        this.props.match.params.quoteId,
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
