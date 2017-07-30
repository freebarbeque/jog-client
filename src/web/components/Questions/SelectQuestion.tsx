import * as React from 'react'
import { MARGIN } from '../../../common/constants/style'
import QuestionField from './QuestionField'
import { SelectQuestionDescriptor } from '../../../business/types'
import SelectBox from './SelectBox'

interface SelectQuestionProps<T> {
  descriptor: SelectQuestionDescriptor<T>
  value: T
  onChange: (id: string, value: T) => void
  onBlur?: () => void
  onFocus?: () => void
  specialOptions?: { label: string; value: string }[]
  onSpecialOptionClick?: (value: string) => void
  index?: number
  error?: string
}

export default class SelectQuestion<T> extends React.Component<
  SelectQuestionProps<T>
> {
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
