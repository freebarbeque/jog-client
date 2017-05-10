import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import TextInput from './TextInput'
import Text from './Text'
import { BLUE, WHITE } from '../constants/palette'

const AccessoryTextInput = (props) => {
  const { accessory, ...rest } = props
  return (
    <View style={styles.container}>
      <View style={styles.accessoryContainer}>
        <Text style={styles.accessoryText}>
          {accessory}
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        {...rest}
      />
    </View>
  )
}

AccessoryTextInput.propTypes = {
  accessory: PropTypes.string,
  ...TextInput.propTypes
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: WHITE,
  },
  accessoryContainer: {
    height: 60,
    borderRightWidth: 1,
    borderRightColor: 1,
    width: 40,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  accessoryText: {
    color: BLUE
  },
  textInput: {
    flex: 1,
    height: 62,
    position: 'relative',
    bottom: 1,
    borderWidth: 0,
    borderColor: WHITE
  }
})

export default AccessoryTextInput

