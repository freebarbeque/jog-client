import * as React from 'react'
import * as _ from 'lodash'

import {
  BaseQuestionDescriptor,
  ValidationErrors,
} from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import IntegerQuestion from './IntegerQuestion'
import { BLUE } from '../../../common/constants/palette'
import MultiSelectQuestion from './MultiSelectQuestion'
import BooleanQuestion from './BooleanQuestion'
import TextQuestion from './TextQuestion'
import BooleanDependentQuestion from './BooleanDependentQuestion'
import { validate } from '../../../business/validation'

interface QuestionSetProps {
  questions: BaseQuestionDescriptor<any>[]
  answers: { [id: string]: any }
  onChange: (id: string, answer: any) => void
  extraComponents?: { [id: string]: { component: React.ComponentClass } }
  onFocus?: (id: string) => void
  onBlur?: (id: string) => void
}

interface QuestionSetState {
  blurred: { [id: string]: boolean }
  submitted: boolean
  errors: ValidationErrors | null
}

export default class QuestionSet extends React.Component<
  QuestionSetProps,
  QuestionSetState
> {
  constructor(props) {
    super(props)
    this.state = {
      blurred: {},
      errors: this.validateAnswers(props.questions, props.answers),
      submitted: false,
    }
  }

  componentWillReceiveNextProps(nextProps) {
    this.setState({
      errors: this.validateAnswers(nextProps.questions, nextProps.answers),
    })
  }

  private validateAnswers = (questions, answers) => {
    return validate(questions, answers)
  }

  private onBlur = (id: string) => {
    console.log('onBlur', id)
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

  private onChange(id: string, answer: any) {
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

  render() {
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
    }

    return (
      <div>
        {this.props.questions.map(q => {
          const type = q.type
          const config = map[type]
          if (config) {
            const Comp = config.component
            const error = this.state.errors.field[q.id]
            const blurred = this.state.blurred[q.id]

            return (
              <Comp
                descriptor={q}
                onChange={this.props.onChange}
                value={answers[q.id]}
                error={blurred ? error : null}
                {...config.props || {}}
              />
            )
          }
          return (
            <div style={{ color: BLUE }}>
              TODO: {type} questions
            </div>
          )
        })}
      </div>
    )
  }

  public validateAllFields(): ValidationErrors {
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
}
