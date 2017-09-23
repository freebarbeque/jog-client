import * as React from 'react'
import styled from 'styled-components'

import { IBooleanQuestionDescriptor } from 'jog-common/business/types'
import { MARGIN } from '../../../common/constants/style'
import QuestionField, { IProps } from './QuestionField'
import SelectBox from './SelectBox'

interface IBooleanQuestionProps extends IProps {
  descriptor: IBooleanQuestionDescriptor
  value: any
  onChange: (id: string, value: any) => void
  onBlur?: () => void
  onFocus?: () => void
  answers?: { [id: string]: any }
}

const Container = styled.div`background-color: rgb(250, 250, 250);`

export default class BooleanQuestion extends React.Component<
  IBooleanQuestionProps
> {
  public render() {
    const id = this.props.descriptor.id
    const value = this.props.value
    return (
      <Container>
        <QuestionField
          descriptor={this.props.descriptor}
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
      </Container>
    )
  }
}
