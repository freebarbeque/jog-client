import * as React from 'react'
import MaterialUIDatePicker from 'material-ui/DatePicker'
import styled from 'styled-components'

const moment = require('moment')

import { BLUE, WHITE } from '../../common/constants/palette'
import DatePickerProps = __MaterialUI.DatePicker.DatePickerProps;


// language=SCSS prefix=dummy{ suffix=}
const Button = styled.button`
  height: 60px;
  background-color: ${WHITE};
  border-radius: 4px;
  overflow: hidden;
  width: 253px;
  border: none !important;
  padding: 0;
`

// language=SCSS prefix=dummy{ suffix=}
const Segment = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-right-color: ${BLUE};
  border-right-width: 1px;
  border-right-style: solid;
  font-size: 16px;
  color: ${BLUE};
  height: 60px;
`

interface JogDatePickerProps extends DatePickerProps {
  value: Date,
}

export default class DatePicker extends React.Component<JogDatePickerProps> {
  picker: any

  hackyPickerPress = () => {
    this.picker.handleTouchTap()
  }

  render() {
    const date = moment(this.props.value).format('MMM DD YYYY')

    console.log('date', date)

    let day = ''
    let month = ''
    let year = ''

    const split = this.props.value ? date.split(' ') : null

    if (split) {
      day = split[0]
      month = split[1]
      year = split[2]
    }

    console.log('split', day, month, year)

    return (
      <Button onClick={this.hackyPickerPress}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <Segment>
            {day}
          </Segment>
          <Segment>
            {month}
          </Segment>
          <Segment>
            {year}
          </Segment>
        </div>
        <MaterialUIDatePicker
          ref={e => {
            this.picker = e
          }}
          style={{ display: 'none' }}
          {...this.props}
        />
      </Button>
    )
  }
}
