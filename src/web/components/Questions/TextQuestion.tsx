import { ITextQuestionDescriptor } from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'
import { BLUE, INPUT_BACKGROUND_COLOR } from '~/common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import QuestionField from './QuestionField'

interface IProps {
  // descriptor: ITextQuestionDescriptor
  value: string
  onChange: (id: string, value: string) => void
  onBlur?: (id: string) => void
  onFocus?: (id: string) => void
  error?: string | null
  index?: number
  descriptor: ITextQuestionDescriptor
}

// language=SCSS prefix=dummy{ suffix=}
export const TextInput = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 10px;
  padding: 15px;
  font-size: 16px;
  background-color: ${INPUT_BACKGROUND_COLOR};
  border-width: 1px;
  border-color: rgb(222, 222, 222);
  border-style: solid;
  color: ${BLUE} !important;
  width: 420px;
  &::placeholder {
    color: #7c8495 !important;
  }

  &.error {
    border: 2px solid #ff4867 !important;
  }
`

export default class TextQuestion extends React.Component<IProps> {
  public render() {
    const id = this.props.descriptor.id

    const error = this.props.error

    return (
      <QuestionField
        descriptor={this.props.descriptor}
        error={this.props.error}
      >
        <TextInput
          value={this.props.value}
          name={id}
          onChange={(e: any) => this.props.onChange(id, e.target.value)}
          className={error ? 'error' : ''}
          onBlur={() => {
            if (this.props.onBlur) this.props.onBlur(id)
          }}
          onFocus={() => {
            if (this.props.onFocus) this.props.onFocus(id)
          }}
        />
      </QuestionField>
    )
  }
}
