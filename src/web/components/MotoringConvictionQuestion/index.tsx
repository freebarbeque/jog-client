import { motoringConvictionsQuestion } from 'jog-common/business/motor'
import {
  constructConviction,
  IMotoringConvictionAnswer,
  questions,
} from 'jog-common/business/motoringConvictions'
import { IMotoringConviction } from 'jog-common/business/types'
import * as React from 'react'
import ConvictionTable from '~/web/components/MotoringConvictionQuestion/ConvictionTable'
import _QuestionSet from '~/web/components/Questions/QuestionSet'

class QuestionSet extends _QuestionSet<IMotoringConvictionAnswer> {}

interface IProps {
  error?: string
  value?: IMotoringConviction[]
  onChange?: (id: string, convictions: IMotoringConviction[]) => void
}

interface IState {
  currentConvictionAnswers: IMotoringConvictionAnswer | null
}

// tslint:disable-next-line:max-classes-per-file
export default class MotoringConvictionQuestion extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentConvictionAnswers: null,
    }
  }

  public render() {
    const currentConvictionAnswers = this.state.currentConvictionAnswers
    const convictions = this.props.value || []

    return (
      <div className="MotoringConvictionQuestion">
        {convictions.length
          ? <ConvictionTable convictions={convictions} />
          : <div>No incidents</div>}
        {!currentConvictionAnswers
          ? <button onClick={this.initNewConviction}>
              Create New Conviction
            </button>
          : null}
        {currentConvictionAnswers
          ? <div className="CurrentConviction">
              <QuestionSet
                questions={questions}
                answers={currentConvictionAnswers}
                onChange={this.onChange}
              />
              <button onClick={this.addConviction}>Add Conviction</button>
            </div>
          : null}
      </div>
    )
  }

  private onChange = (id: string, answer: any) => {
    const currentConvictionAnswers = {
      ...this.state.currentConvictionAnswers,
    }
    currentConvictionAnswers[id] = answer

    this.setState({
      currentConvictionAnswers,
    })
  }

  private initNewConviction = () => {
    this.setState({ currentConvictionAnswers: {} as any })
  }

  private addConviction = () => {
    const questionId = motoringConvictionsQuestion.id
    const convictions = this.props.value || []
    const conviction = this.state.currentConvictionAnswers
      ? constructConviction(this.state.currentConvictionAnswers)
      : null

    if (this.props.onChange && conviction) {
      this.props.onChange(questionId, [...convictions, conviction])
      this.setState({ currentConvictionAnswers: null })
    }
  }
}
