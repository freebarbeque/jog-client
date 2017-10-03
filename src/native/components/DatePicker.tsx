import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { BLUE, WHITE } from '~/common/constants/palette'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

import Text from './Text'

interface IJogDatePickerProps {
  date?: string
  onDateChange: (date: string) => void
}

export default class JogDatePicker extends React.Component<
  IJogDatePickerProps,
  {}
> {
  private picker: any

  constructor(props: IJogDatePickerProps) {
    super(props)
    this.state = {}
  }

  public componentDidMount() {
    // this.picker.onPressDate()
  }

  public render() {
    const date = moment(this.props.date, 'DD/MM/YYYY').format('MMM DD YYYY')

    let day = ''
    let month = ''
    let year = ''

    const split = this.props.date ? date.split(' ') : null

    if (split) {
      day = split[0]
      month = split[1]
      year = split[2]
    }

    return (
      <View>
        <TouchableOpacity onPress={this.hackyPickerPress} style={styles.button}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.segment}>
              <Text style={styles.segmentText}>
                {day}
              </Text>
            </View>
            <View style={styles.segment}>
              <Text style={styles.segmentText}>
                {month}
              </Text>
            </View>
            <View style={styles.segment}>
              <Text style={styles.segmentText}>
                {year}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* DatePicker is hidden due to not being customisable enough to implement the designs */}
        <DatePicker
          ref={e => {
            this.picker = e
          }}
          date={this.props.date}
          format="DD/MM/YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              height: 0,
              width: 0,
            },
            dateInput: {
              position: 'absolute',
              top: 0,
              left: 0,
              height: 0,
              width: 0,
              opacity: 0,
            },
          }}
          onDateChange={this.props.onDateChange}
        />
      </View>
    )
  }

  private hackyPickerPress = () => {
    this.picker.onPressDate()
  }
}

//
// Styles
//

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: WHITE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BLUE,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 16,
    color: BLUE,
  },
})
