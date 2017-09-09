import * as _ from 'lodash'
import * as React from 'react'

import { IBaseQuestionDescriptor } from 'jog-common/business/types'
import { validate } from 'jog-common/business/validation'
import { BLUE } from '../../../common/constants/palette'
import BooleanDependentQuestion from './BooleanDependentQuestion'
import BooleanQuestion from './BooleanQuestion'
import DateQuestion from './DateQuestion'
import IntegerQuestion from './IntegerQuestion'
import MultiSelectQuestion from './MultiSelectQuestion'
import SelectQuestion from './SelectQuestion'
import TextQuestion from './TextQuestion'

export interface IQuestionSetProps<T> {
  questions: Array<IBaseQuestionDescriptor<any>>
  answers: T
  onChange: (id: string, answer: any) => void
  extraComponents?: { [id: string]: { component: React.ComponentClass } }
  onFocus?: (id: string) => void
  onBlur?: (id: string) => void
}

export interface IQuestionSetState {
  blurred: { [id: string]: boolean }
  submitted: boolean
  errors: { [id: string]: string } | null
}

export default class QuestionSet<T> extends React.Component<
  IQuestionSetProps<T>,
  IQuestionSetState
> {
  constructor(props) {
    super(props)
    this.state = {
      blurred: {},
      errors: this.validateAnswers(props.questions, props.answers),
      submitted: false,
    }
  }

  public render() {
    const { onFocus, answers, extraComponents = {} } = this.props
    const onBlur = this.onBlur

    const map = {
      ...extraComponents,
      select: { component: SelectQuestion },
      multiselect: { component: MultiSelectQuestion },
      numeric: { component: IntegerQuestion, props: { onFocus, onBlur } },
      'boolean-dependent': {
        component: BooleanDependentQuestion,
        // Boolean dependent questions may have dependencies so we need to pass on the extra components & answers
        props: { extraComponents, answers },
      },
      boolean: {
        component: BooleanQuestion,
      },
      text: {
        component: TextQuestion,
        props: { onFocus, onBlur },
      },
      date: {
        component: DateQuestion,
      },
    }

    return (
      <div className="QuestionSet">
        {this.props.questions.map(q => {
          const type = q.type
          const config = map[type]
          if (config) {
            const Comp = config.component
            const error = this.state.errors && this.state.errors[q.id]
            const blurred = this.state.blurred[q.id]

            const getValue = () => {
              let answer = answers[q.id]
              if (!answer) {
                if (q.defaultValue) {
                  answer =
                    typeof q.defaultValue === 'function'
                      ? q.defaultValue()
                      : q.defaultValue
                }
              }
              return answer
            }

            return (
              <Comp
                key={q.id}
                descriptor={q}
                onChange={this.onChange}
                value={getValue()}
                error={blurred ? error : null}
                {...config.props || {}}
              />
            )
          }
          return (
            <div style={{ color: BLUE }} key={q.id}>
              TODO: {type} questions
            </div>
          )
        })}
      </div>
    )
  }

  public validateAllFields(): { [id: string]: string } {
    const blurred = { ...this.state.blurred }

    _.forEach(this.props.questions, q => {
      const id = q.id
      blurred[id] = true
    })

    const errors = this.validateAnswers(
      this.props.questions,
      this.props.answers,
    )

    this.setState({ blurred, errors })

    return errors
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({
      errors: this.validateAnswers(nextProps.questions, nextProps.answers),
    })
  }

  private validateAnswers = (questions, answers) => {
    const validationErrors = validate(questions, answers)
    return validationErrors
  }

  private onBlur = (id: string) => {
    const blurred = {
      ...this.state.blurred,
    }
    blurred[id] = true
    this.setState({
      blurred,
    })
    if (this.props.onBlur) {
      this.props.onBlur(id)
    }
  }

  private onChange = (id: string, answer: any) => {
    const blurred = {
      ...this.state.blurred,
    }
    blurred[id] = true
    this.setState({
      blurred,
    })
    if (this.props.onChange) {
      this.props.onChange(id, answer)
    }
  }
}
