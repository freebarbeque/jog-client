// @flow

import React, { Component } from 'react'
import { MARGIN } from '../../../common/constants/style'
import type { QuestionFieldProps } from './QuestionField'
import QuestionField from './QuestionField'
import SelectBox from './SelectBox'
import type { BooleanQuestionDescriptor } from '../../../business/types'
import QuestionSet from './QuestionSet'

type BooleanQuestionProps<T> = {
  ...QuestionFieldProps,
  descriptor: BooleanQuestionDescriptor<T>,
  value: T,
  onChange: (id: string, value: T) => void,
  onBlur?: () => void,
  onFocus?: () => void,
  answers?: { [string]: mixed },
}

export default class BooleanQuestion extends Component {
  props: BooleanQuestionProps<*>

  render() {
    const id = this.props.descriptor.id
    const value = this.props.value
    const dependentQuestions = this.props.descriptor.dependentQuestions
    const answers = this.props.answers

    if (dependentQuestions && !answers) {
      throw new Error(
        'If have dependent questions, must pass answers to BooleanQuestion',
      )
    }

    return (
      <div>
        <QuestionField
          descriptor={this.props.descriptor}
          index={this.props.index}
          error={this.props.error}
        >
          <div style={{ position: 'relative', right: MARGIN.base }}>
            <SelectBox
              className={`${value ? 'selected' : ''}`}
              onClick={() => this.props.onChange(id, true)}
            >
              Yes
            </SelectBox>
            <SelectBox
              className={`${!value && value !== undefined && value !== null
                ? 'selected'
                : ''}`}
              onClick={() => this.props.onChange(id, false)}
            >
              No
            </SelectBox>
          </div>
        </QuestionField>
        {value && dependentQuestions
          ? <QuestionSet
              questions={dependentQuestions}
              answers={answers}
              onChange={this.props.onChange}
            />
          : null}
      </div>
    )
  }
}
