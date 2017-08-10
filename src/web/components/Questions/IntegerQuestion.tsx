import { INumericQuestionDescriptor } from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'
import { MARGIN } from '../../../common/constants/style'
import { IProps } from './QuestionField'
import QuestionField from './QuestionField'

interface IntegerQuestionProps extends IProps {
  descriptor: INumericQuestionDescriptor
  value: number
  onChange: (id: string, value: number) => void
  onBlur?: () => void
  onFocus?: () => void
}

interface IntegerQuestionState {
  value: string
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

export default class IntegerQuestion extends React.Component<
  IntegerQuestionProps,
  IntegerQuestionState
> {
  constructor(props) {
    super(props)
    const value = props.value
    this.state = {
      value: value ? value.toString() : '0',
    }
  }

  public render() {
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
          onChange={(e: any) => {
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

  public componentWillReceiveProps(props: IntegerQuestionProps) {
    if (this.props.value !== props.value) {
      this.setState({
        value: props.value ? props.value.toString() : '0',
      })
    }
  }

  private onKeyPress(e) {
    return e.charCode >= 48 && e.charCode <= 57
  }
}
