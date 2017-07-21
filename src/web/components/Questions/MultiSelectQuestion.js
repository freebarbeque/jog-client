// @flow

import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import { MARGIN } from '../../../common/constants/style'
import type { QuestionFieldProps } from './QuestionField'
import QuestionField from './QuestionField'
import type { MultiSelectQuestionDescriptor } from '../../../business/types'
import SelectBox from './SelectBox'

// language=SCSS prefix=dummy{ suffix=}
const MultiSelectBox = styled(SelectBox)`
  &.selected {
    cursor: default;
  }
`

type MultiSelectQuestionProps<T> = {
  ...QuestionFieldProps,
  descriptor: MultiSelectQuestionDescriptor<T>,
  value: T[],
  onChange: (id: string, value: T[]) => void,
  onBlur?: () => void,
  onFocus?: () => void,
}

export default class MultiSelectQuestion extends Component {
  props: MultiSelectQuestionProps<*>

  render() {
    return (
      <QuestionField
        descriptor={this.props.descriptor}
        index={this.props.index}
        error={this.props.error}
      >
        <div style={{ position: 'relative', right: MARGIN.base }}>
          {this.props.descriptor.options.map(o => {
            const currentValue = this.props.value || []
            return (
              <MultiSelectBox
                className={`${_.includes(currentValue, o.value)
                  ? 'selected'
                  : ''}`}
                onClick={() => {
                  if (_.includes(currentValue, o.value)) {
                    const idx = _.findIndex(currentValue, o.value)
                    const newValue = [...currentValue]
                    newValue.splice(idx, 1)
                    this.props.onChange(this.props.descriptor.id, newValue)
                  } else {
                    this.props.onChange(this.props.descriptor.id, [
                      ...currentValue,
                      o.value,
                    ])
                  }
                }}
              >
                {o.label}
              </MultiSelectBox>
            )
          })}
        </div>
      </QuestionField>
    )
  }
}
