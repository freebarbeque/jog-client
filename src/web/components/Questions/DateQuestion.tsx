import { IDateQuestionDescriptor } from 'jog-common/business/types'
import DatePicker from 'material-ui/DatePicker'
import * as React from 'react'
import styled from 'styled-components'

import { BLUE, INPUT_BACKGROUND_COLOR } from '../../../common/constants/palette'
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
    margin-top: ${MARGIN.base}px !important;
    height: 10px !important;
    padding: 15px !important;
    font-size: 16px !important;
    background-color: ${INPUT_BACKGROUND_COLOR} !important;
    border-width: 1px !important;
    border-color: rgb(222,222,222) !important;
    border-style: solid !important;
    color: ${BLUE} !important;
    &::placeholder {
      color: #7C8495 !important;
    }
  }

  &.error {
    input {
      border: 2px solid #FF4867 !important;
    }
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

    return (
      <div>
        <QuestionField
          descriptor={this.props.descriptor}
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
