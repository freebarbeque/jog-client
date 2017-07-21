// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import type { NumericQuestionDescriptor } from '../../../business/types'
import { MARGIN } from '../../../common/constants/style'
import type { QuestionFieldProps } from './QuestionField'
import QuestionField from './QuestionField'

type IntegerQuestionProps = {
  ...QuestionFieldProps,
  descriptor: NumericQuestionDescriptor,
  value: number,
  onChange: (id: string, value: number) => void,
  onBlur?: () => void,
  onFocus?: () => void,
}

type IntegerQuestionState = {
  value: string,
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

export default class IntegerQuestion extends Component {
  props: IntegerQuestionProps
  state: IntegerQuestionState

  constructor(props) {
    super(props)
    const value = props.value
    this.state = {
      value: value ? value.toString() : '0',
    }
  }

  componentWillReceiveProps(props: IntegerQuestionProps) {
    if (this.props.value !== props.value) {
      this.setState({
        value: props.value ? props.value.toString() : '0',
      })
    }
  }

  onKeyPress(e) {
    return e.charCode >= 48 && e.charCode <= 57
  }

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
          value={this.state.value}
          onKeyPress={this.onKeyPress}
          name={id}
          type="number"
          onChange={e => {
            this.setState({
              value: e.target.value,
            })
            this.props.onChange(id, parseInt(e.target.value, 10))
          }}
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
