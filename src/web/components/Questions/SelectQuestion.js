// @flow

import React, { Component } from 'react'
import { MARGIN } from '../../../common/constants/style'
import type { QuestionFieldProps } from './QuestionField'
import QuestionField from './QuestionField'
import type { SelectQuestionDescriptor } from '../../../business/types'
import SelectBox from './SelectBox'

type SelectQuestionProps<T> = {
  ...QuestionFieldProps,
  descriptor: SelectQuestionDescriptor<T>,
  value: T,
  onChange: (id: string, value: T) => void,
  onBlur?: () => void,
  onFocus?: () => void,
  specialOptions?: { label: string, value: string }[],
  onSpecialOptionClick?: (value: string) => void,
}

export default class SelectQuestion extends Component {
  props: SelectQuestionProps<*>

  render() {
    return (
      <QuestionField
        descriptor={this.props.descriptor}
        index={this.props.index}
        error={this.props.error}
      >
        <div style={{ position: 'relative', right: MARGIN.base }}>
          {this.props.descriptor.options.map(o => {
            return (
              <SelectBox
                className={`${o.value === this.props.value ? 'selected' : ''}`}
                onClick={() =>
                  this.props.onChange(this.props.descriptor.id, o.value)}
              >
                {o.label}
              </SelectBox>
            )
          })}
          {this.props.specialOptions
            ? this.props.specialOptions.map(o => {
                return (
                  <SelectBox
                    onClick={() => this.props.onSpecialOptionClick(o.value)}
                  >
                    {o.label}
                  </SelectBox>
                )
              })
            : null}
        </div>
      </QuestionField>
    )
  }
}
