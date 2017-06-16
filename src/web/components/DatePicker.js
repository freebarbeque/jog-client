import React, { Component } from 'react'
import moment from 'moment'
import MaterialUIDatePicker from 'material-ui/DatePicker'
import styled from 'styled-components'
import { BLUE, WHITE } from '../../common/constants/palette'

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

type JogDatePickerProps = {
  value: Date,
}

export default class DatePicker extends Component {
  props: JogDatePickerProps
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

// // language=SCSS prefix=dummy{ suffix=}
// export default styled(DatePicker)`
//   height: 60px !important;
//
//   input {
//     background-color: ${WHITE} !important;
//     height: 60px !important;
//     color: ${BLUE} !important;
//     -webkit-text-fill-color: ${BLUE} !important;
//     z-index: 1;
//     border-radius: 4px;
//     padding-left: ${MARGIN.large}px !important;
//   }
//
//   hr {
//     display: none;
//   }
//
//   >div:first-child {
//     position: relative !important;
//     height: 60px !important;
//
//     >div:first-child {
//       color: ${BLUE} !important;
//       -webkit-text-fill-color: ${BLUE} !important;
//       z-index: 2;
//       height: 60px !important;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       top: 0 !important;
//       left: 0 !important;
//       padding-left: ${MARGIN.large}px;
//     }
//   }
// `
