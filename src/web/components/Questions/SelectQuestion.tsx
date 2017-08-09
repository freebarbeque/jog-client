import * as React from 'react'
import { ISelectQuestionDescriptor } from '../../../business/types'
import { PINK } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import QuestionField from './QuestionField'
import SelectBox from './SelectBox'

const SpecialSelectBox = SelectBox.extend`background-color: ${PINK};`

interface ISelectQuestionProps<T> {
  descriptor: ISelectQuestionDescriptor<T>
  value?: T
  onChange: (id: string, value: T) => void
  onBlur?: () => void
  onFocus?: () => void
  specialOptions?: Array<{ label: string; value: string }>
  onSpecialOptionClick?: (value: string) => void
  index?: number
  error?: string
}

export default class SelectQuestion<T> extends React.Component<
  ISelectQuestionProps<T>
> {
  public render() {
    const onSpecialOptionClick =
      this.props.onSpecialOptionClick ||
      (() => {
        /* Do nothing */
      })

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
                key={`${o.value}${o.label}`}
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
                  <SpecialSelectBox
                    key={o.value}
                    onClick={() => onSpecialOptionClick(o.value)}
                  >
                    {o.label}
                  </SpecialSelectBox>
                )
              })
            : null}
        </div>
      </QuestionField>
    )
  }
}
