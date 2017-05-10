/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import RNPicker from 'react-native-picker'
import { Dropdown } from './images/index'
import { BLUE, DARK_GRAY, WHITE } from '../constants/palette'
import { MARGIN } from '../constants/style'
import Text from './Text'

export type PickerOption = {label: string, value: string}

type PickerProps = {
  value?: PickerOption | null,
  onChange: (value: PickerOption) => void,
  options: PickerOption[],
  placeholder: string,
  titleText?: string,
};

type PickerState = {};

export default class Picker extends Component {
  props: PickerProps
  state: PickerState

  constructor(props: PickerProps) {
    super(props)
    this.state = {}
  }

  componentWillUnmount() {
    RNPicker.hide()
  }

  handlePress = () => {
    const pickerData = this.props.options.map((o) => o.label)

    RNPicker.init({
      pickerData,
      selectedValue: this.props.value ? [this.props.value.label] : [],
      onPickerConfirm: (data) => {
        const option = this.props.options.find((o) => o.label === data[0])
        if (option) { this.props.onChange(option) }
      },
      pickerTitleText: this.props.titleText,
      pickerConfirmBtnText: 'Confirm',
      pickerCancelBtnText: 'Cancel',
    })
    RNPicker.show()
  }

  render() {
    const value = this.props.value

    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <View style={styles.content}>
          <Text style={value ? styles.selectedText : styles.placeholderText}>{value ? value.label : this.props.placeholder}</Text>
        </View>
        <View style={styles.dropdown}>
          <Dropdown />
        </View>
      </TouchableOpacity>
    )
  }
}

//
// Styles
//

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: WHITE,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: MARGIN.large
  },
  dropdown: {
    height: 60,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: BLUE,
    borderLeftWidth: 1,
  },
  selectedText: {
    fontSize: 16,
    color: BLUE
  },
  placeholderText: {
    fontSize: 16,
    color: DARK_GRAY,
  }
})
