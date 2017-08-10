import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import {
  setMotorAnswer,
  setMotorAnswers,
} from '../../../common/store/markets/index'
import { IReduxState } from '../../../common/types'

import { RouteComponentProps, withRouter } from 'react-router'
import {
  constructAnswers,
  constructQuoteRequest,
  questions as motorQuestions,
} from '../../../business/motor'
import { IQuoteRequest } from '../../../business/types'
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
      this.updateAnswers(quoteId)
    }
  }

  public componentWillReceiveProps(nextProps: IMotorQuoteScreenProps) {
    const priorQuoteId = this.props.match.params.quoteId
    const newQuoteId = nextProps.match.params.quoteId
    if (priorQuoteId !== newQuoteId) {
      this.updateAnswers(newQuoteId)
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
    this.saveQuote()
  }

  private updateAnswers(quoteId: string) {
    const qr: IQuoteRequest | undefined = this.props.quoteRequests[quoteId]
    if (qr) {
      const answers = constructAnswers(qr)
      this.props.dispatch(setMotorAnswers(answers))
    }
  }

  private saveQuote() {
    const quoteId = this.props.match.params.quoteId
    const qr = constructQuoteRequest(this.props.motorAnswers, quoteId)
    this.props.dispatch(addQuoteRequest(qr, quoteId))
  }

  private handleSubmit = () => {
    // TODO: Mark as pending as opposed to incomplete, as it has now passed validation.
    if (!this.questionSetComp)
      throw new Error(
        'How is submit being pressed before everything is mounted?',
      )
    const errors = this.questionSetComp.validateAllFields()
    if (!errors.hasError) {
      this.saveQuote()
    }
  }
}

export default connect((state: IReduxState) => ({
  motorAnswers: state.markets.motorAnswers,
  quoteRequests: state.markets.quoteRequests,
}))(withRouter(MotorQuoteScreen))
