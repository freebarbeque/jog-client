// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import type { TextQuestionDescriptor } from '../../../business/types'
import { MARGIN } from '../../../common/constants/style'
import type { QuestionFieldProps } from './QuestionField'
import QuestionField from './QuestionField'

type TextQuestionProps = {
  ...QuestionFieldProps,
  descriptor: TextQuestionDescriptor,
  value: string,
  onChange: (value: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
}

// language=SCSS prefix=dummy{ suffix=}
const Input = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 10px;
  padding: ${MARGIN.large}px;
  font-size: 16px;
  background-color: rgb(240, 240, 240);
  border: none;
`

export default class TextQuestion extends Component {
  props: TextQuestionProps

  render() {
    const id = this.props.descriptor.id

    const error = this.props.error

    return (
      <QuestionField
        descriptor={this.props.descriptor}
        index={this.props.index}
        error={this.props.error}
      >
        <Input
          value={this.props.value}
          name={id}
          onChange={e => this.props.onChange(id, e.target.value)}
          style={{
            backgroundColor: error ? '#efc9c9' : 'rgb(240, 240, 240)',
          }}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
      </QuestionField>
    )
  }
}
