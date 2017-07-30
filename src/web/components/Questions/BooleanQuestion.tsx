import * as React from 'react'
import { MARGIN } from '../../../common/constants/style'
import { QuestionFieldProps } from './QuestionField'
import QuestionField from './QuestionField'
import SelectBox from './SelectBox'
import { BooleanQuestionDescriptor } from '../../../business/types'

interface BooleanQuestionProps extends QuestionFieldProps {
  descriptor: BooleanQuestionDescriptor
  value: any
  onChange: (id: string, value: any) => void
  onBlur?: () => void
  onFocus?: () => void
  answers?: { [id: string]: any }
}

export default class BooleanQuestion extends React.Component<
  BooleanQuestionProps
> {
  render() {
    const id = this.props.descriptor.id
    const value = this.props.value
    return (
      <div>
        <QuestionField
          descriptor={this.props.descriptor}
          index={this.props.index}
          error={this.props.error}
        >
          <div style={{ position: 'relative', right: MARGIN.base }}>
            <SelectBox
              className={`${value ? 'selected' : ''}`}
              onClick={() => this.props.onChange(id, true)}
            >
              Yes
            </SelectBox>
            <SelectBox
              className={`${!value && value !== undefined && value !== null
                ? 'selected'
                : ''}`}
              onClick={() => this.props.onChange(id, false)}
            >
              No
            </SelectBox>
          </div>
        </QuestionField>
      </div>
    )
  }
}
