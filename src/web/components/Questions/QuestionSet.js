// @flow

import React, { Component } from 'react'
import { BaseQuestionDescriptor } from '../../../business/types'
import SelectQuestion from './SelectQuestion'
import IntegerQuestion from './IntegerQuestion'
import { BLUE } from '../../../common/constants/palette'
import MultiSelectQuestion from './MultiSelectQuestion'

type QuestionSetProps = {
  questions: BaseQuestionDescriptor<any>[],
  answers: { [string]: mixed },
  onChange: (id: string, answer: mixed) => void,
  extraComponents: { [string]: { component: typeof Component } },
}

export default class QuestionSet extends Component {
  props: QuestionSetProps

  render() {
    const map = {
      ...(this.props.extraComponents || {}),
      select: { component: SelectQuestion },
      multiselect: { component: MultiSelectQuestion },
      numeric: { component: IntegerQuestion },
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
                value={this.props.answers[q.id]}
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
