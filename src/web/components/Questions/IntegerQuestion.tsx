import { INumericQuestionDescriptor } from 'jog-common/business/types'
import * as React from 'react'
import { TextInput } from '~/web/components/Questions/TextQuestion'
import QuestionField, { IProps } from './QuestionField'

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
        error={this.props.error}
      >
        <TextInput
          value={this.state.value}
          onKeyPress={this.onKeyPress}
          name={id}
          type="number"
          className={error ? 'error' : ''}
          onChange={(e: any) => {
            this.setState({
              value: e.target.value,
            })
            this.props.onChange(id, parseInt(e.target.value, 10))
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
