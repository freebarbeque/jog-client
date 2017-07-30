import * as React from 'react'
import styled from 'styled-components'
import { TextQuestionDescriptor } from '../../../business/types'
import { MARGIN } from '../../../common/constants/style'
import QuestionField from './QuestionField'

interface TextQuestionProps {
  descriptor: TextQuestionDescriptor,
  value: string,
  onChange: (id: string, value: string) => void,
  onBlur?: () => void,
  onFocus?: () => void,
  error?: string,
  index?: number
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

export default class TextQuestion extends React.Component<TextQuestionProps> {
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
          onChange={(e: any) => this.props.onChange(id, e.target.value)}
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
