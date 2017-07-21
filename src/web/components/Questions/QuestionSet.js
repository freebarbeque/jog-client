// @flow

import React, { Component } from 'react'
import { BaseQuestionDescriptor } from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import IntegerQuestion from './IntegerQuestion'
import { BLUE } from '../../../common/constants/palette'
import MultiSelectQuestion from './MultiSelectQuestion'
import BooleanQuestion from './BooleanQuestion'

type QuestionSetProps = {
  questions: BaseQuestionDescriptor<any>[],
  answers: { [string]: mixed },
  onChange: (id: string, answer: mixed) => void,
  extraComponents?: { [string]: { component: typeof Component } },
}

export default class QuestionSet extends Component {
  props: QuestionSetProps

  render() {
    const extraComponents = this.props.extraComponents || {}
    const answers = this.props.answers
    const map = {
      ...extraComponents,
      select: { component: SelectQuestion },
      multiselect: { component: MultiSelectQuestion },
      numeric: { component: IntegerQuestion },
      boolean: {
        component: BooleanQuestion,
        // Boolean questions may have dependencies so we need to pass on the extra components & answers
        props: { extraComponents, answers },
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
