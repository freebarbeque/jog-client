import * as React from 'react'
import { BaseQuestionDescriptor } from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import IntegerQuestion from './IntegerQuestion'
import { BLUE } from '../../../common/constants/palette'
import MultiSelectQuestion from './MultiSelectQuestion'
import BooleanQuestion from './BooleanQuestion'
import TextQuestion from './TextQuestion'
import BooleanDependentQuestion from './BooleanDependentQuestion'

type QuestionSetProps = {
  questions: BaseQuestionDescriptor<any>[]
  answers: { [id: string]: any }
  onChange: (id: string, answer: any) => void
  extraComponents?: { [id: string]: { component: React.ComponentClass } }
  onFocus?: (id: string) => void
  onBlur?: (id: string) => void
}

export default class QuestionSet extends React.Component {
  props: QuestionSetProps

  render() {
    const { onFocus, onBlur, answers, extraComponents = {} } = this.props
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
            return (
              <Comp
                descriptor={q}
                onChange={this.props.onChange}
                value={answers[q.id]}
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
}
