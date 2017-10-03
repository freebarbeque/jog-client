import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import RNPicker from 'react-native-picker'
import { BLUE, DARK_GRAY, WHITE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'

import { Dropdown } from './images/index'
import Text from './Text'

export interface IPickerOption {
  label: string
  value: string
}

interface IPickerProps {
  value?: IPickerOption | null
  onChange: (value: IPickerOption) => void
  options: IPickerOption[]
  placeholder: string
  titleText?: string
}

export default class Picker extends React.Component<IPickerProps> {
  public componentWillUnmount() {
    RNPicker.hide()
  }

  public render() {
    const value = this.props.value

    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <View style={styles.content}>
          <Text style={value ? styles.selectedText : styles.placeholderText}>
            {value ? value.label : this.props.placeholder}
          </Text>
        </View>
        <View style={styles.dropdown}>
          <Dropdown />
        </View>
      </TouchableOpacity>
    )
  }

  private handlePress = () => {
    const pickerData = this.props.options.map(o => o.label)

    RNPicker.init({
      pickerData,
      selectedValue: this.props.value ? [this.props.value.label] : [],
      onPickerConfirm: data => {
        const option = this.props.options.find(o => o.label === data[0])
        if (option) {
          this.props.onChange(option)
        }
      },
      pickerTitleText: this.props.titleText,
      pickerConfirmBtnText: 'Confirm',
      pickerCancelBtnText: 'Cancel',
    })
    RNPicker.show()
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
    paddingLeft: MARGIN.large,
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
    color: BLUE,
  },
  placeholderText: {
    fontSize: 16,
    color: DARK_GRAY,
  },
})
