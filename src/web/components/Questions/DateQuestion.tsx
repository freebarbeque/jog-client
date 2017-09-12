import { IDateQuestionDescriptor } from 'jog-common/business/types'
import DatePicker from 'material-ui/DatePicker'
import * as React from 'react'
import styled from 'styled-components'

import { BLUE } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import QuestionField, { IProps } from './QuestionField'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

interface IDateQuestionProps extends IProps {
  descriptor: IDateQuestionDescriptor
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

export default class DateQuestion extends React.Component<IDateQuestionProps> {
  private picker: any

  public render() {
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
            onChange={(e, v) =>
              this.props.onChange(this.props.descriptor.id, v)}
            hintText="Date"
            name="Date"
            id={`${id}`}
            disabled={false}
            formatDate={date => {
              if (date) {
                return moment(date).format('DD/MM/YYYY')
              }
              return ''
            }}
          />
        </QuestionField>
      </div>
    )
  }
}
