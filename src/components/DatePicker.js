/* @flow */

import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { BLUE, WHITE } from '../constants/palette'
import Text from './Text'

type JogDatePickerProps = {
  date: string,
  onDateChange: (date: string) => void
};

type JogDatePickerState = {};

export default class JogDatePicker extends Component {
  props: JogDatePickerProps
  state: JogDatePickerState

  constructor(props: JogDatePickerProps) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.picker.onPressDate()
  }

  hackyPickerPress = () => {
    this.picker.onPressDate()
  }

  render() {
    const date = this.props.date

    let day = ''
    let month = ''
    let year = ''

    const split = date ? date.split('/') : null

    if (split) {
      day = split[0]
      month = split[1]
      year = split[2]
    }

    return (
      <View>
        <TouchableOpacity
          onPress={this.hackyPickerPress}
          style={styles.button}
        >
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
          ref={(e) => { this.picker = e }}
          date={date}
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
              opacity: 0
            }
          }}
          onDateChange={this.props.onDateChange}
        />
      </View>
    )
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
    overflow: 'hidden'
  },
  segment: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BLUE,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  segmentText: {
    fontSize: 16,
    color: BLUE
  }
})
