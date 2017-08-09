import * as React from 'react'
import { IBooleanDependentQuestionDescriptor } from '../../../business/types'
import { MARGIN } from '../../../common/constants/style'
import { IProps } from './QuestionField'
import QuestionField from './QuestionField'
import SelectBox from './SelectBox'

import QuestionSet from './QuestionSet'

interface IBooleanDependentQuestionProps extends IProps {
  descriptor: IBooleanDependentQuestionDescriptor<any>
  value: any
  onChange: (id: string, value: any) => void
  onBlur?: () => void
  onFocus?: () => void
  answers?: { [id: string]: any }
}

export default class BooleanDependentQuestion extends React.Component<
  IBooleanDependentQuestionProps
> {
  public render() {
    const id = this.props.descriptor.id
    const reverse = this.props.descriptor.reverse
    const value = this.props.value
    const dependentQuestions = this.props.descriptor.dependentQuestions
    const answers = this.props.answers
    const answered = value !== null && value !== undefined

    if (dependentQuestions && !answers) {
      throw new Error(
        'If have dependent questions, must pass answers to BooleanQuestion',
      )
    }

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
        {((!reverse && value) || (reverse && !value)) &&
        answered &&
        dependentQuestions
          ? <QuestionSet
              questions={dependentQuestions}
              answers={answers || {}}
              onChange={this.props.onChange}
            />
          : null}
      </div>
    )
  }
}
