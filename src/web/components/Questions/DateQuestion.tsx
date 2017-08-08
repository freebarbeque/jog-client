import DatePicker from 'material-ui/DatePicker'
import * as React from 'react'
import { Component } from 'react'
import styled from 'styled-components'
import { DateQuestionDescriptor } from '../../../business/types'
import { BLUE } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import QuestionField, { QuestionFieldProps } from './QuestionField'

interface Props extends QuestionFieldProps {
  descriptor: DateQuestionDescriptor
  value: Date
  onChange: (id: string, value: Date) => void
}

const MaterialUIDatePicker = styled(DatePicker)`
  input {
    margin-top: ${MARGIN.base}px;
    color: ${BLUE} !important;
    height: 10px !important;
    padding: ${MARGIN.large}px !important;
    background-color: rgb(240, 240, 240) !important;
    max-width: 167px;
  }

  hr {
    display: none !important;
  }
`

export default class DateQuestion extends React.Component<Props> {
  picker: any

  render() {
    const id = this.props.descriptor.id
    const value = this.props.value

    console.log('value', value)

    return (
      <div>
        <QuestionField
          descriptor={this.props.descriptor}
          index={this.props.index}
          error={this.props.error}
        >
          <MaterialUIDatePicker
            ref={e => (this.picker = e)}
            value={value}
            onChange={(e, value) =>
              this.props.onChange(this.props.descriptor.id, value)}
            hintText="Date"
            name="Date"
            id={`${id}`}
            disabled={false}
          />
        </QuestionField>
      </div>
    )
  }
}
