import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { BLUE, WHITE } from '~/common/constants/palette'

import Text from './Text'
import TextInput from './TextInput'

const AccessoryTextInput = props => {
  const { accessory, ...rest } = props
  return (
    <View style={styles.container}>
      <View style={styles.accessoryContainer}>
        <Text style={styles.accessoryText}>
          {accessory}
        </Text>
      </View>
      <TextInput style={styles.textInput} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  accessoryContainer: {
    height: 60,
    borderRightWidth: 1,
    borderRightColor: 1,
    width: 40,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessoryText: {
    color: BLUE,
  },
  textInput: {
    flex: 1,
    height: 62,
    position: 'relative',
    bottom: 1,
    borderWidth: 0,
    borderColor: WHITE,
  },
})

export default AccessoryTextInput
