import { motoringConvictionsQuestion } from 'jog-common/business/driver'
import {
  IMotoringConvictionAnswer,
  questions,
} from 'jog-common/business/motoringConvictions'
import * as React from 'react'
import styled from 'styled-components'
import { LIGHT_CREAM } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import ConvictionTable from '~/web/components/MotoringConvictionQuestion/ConvictionTable'
import _QuestionSet from '~/web/components/Questions/QuestionSet'
import RoundedButton from '~/web/components/RoundedButton'
import CancelButton from '../MotoringIncidentQuestion/CancelButton'

const CurrentConviction = styled.div`
  background-color: ${LIGHT_CREAM};
  margin-top: ${MARGIN.base}px;
  padding: ${MARGIN.base}px;
`

class QuestionSet extends _QuestionSet<IMotoringConvictionAnswer> {}

interface IProps {
  error?: string
  value?: IMotoringConvictionAnswer[]
  onChange?: (id: string, convictions: IMotoringConvictionAnswer[]) => void
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
        <ConvictionTable
          convictions={convictions}
          onRemovePress={this.handleRemovePress}
        />
        {!currentConvictionAnswers
          ? <RoundedButton
              onClick={this.initNewConviction}
              label="Create New Conviction"
              style={{
                marginTop: MARGIN.base,
                width: 180,
                marginBottom: MARGIN.large,
              }}
            />
          : null}
        {currentConvictionAnswers
          ? <CurrentConviction className="CurrentConviction">
              <QuestionSet
                questions={questions}
                answers={currentConvictionAnswers}
                onChange={this.onChange}
              />
              <RoundedButton
                onClick={this.addConviction}
                label="Add Conviction"
                style={{ marginTop: MARGIN.base }}
              />
              <CancelButton
                onClick={this.handleCancel}
                style={{ marginTop: MARGIN.base }}
              >
                Cancel
              </CancelButton>
            </CurrentConviction>
          : null}
      </div>
    )
  }

  private handleCancel = () => {
    this.setState({
      currentConvictionAnswers: null,
    })
  }

  private handleRemovePress = (i: number) => {
    const questionId = motoringConvictionsQuestion.id
    if (this.props.value && this.props.onChange) {
      const value = [...this.props.value]
      value.splice(i, 1)
      this.props.onChange(questionId, value)
    }
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

    if (this.props.onChange && conviction) {
      this.props.onChange(questionId, [...convictions, conviction])
      this.setState({ currentConvictionAnswers: null })
    }
  }
}
