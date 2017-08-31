import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { DARK_GRAY } from '~/common/constants/palette'
import Text from './Text'

const styles = StyleSheet.create({
  touchable: {},
  text: {
    color: DARK_GRAY,
    fontWeight: '700',
  },
})

const AccessoryButton = ({ label, style = {}, textStyle = {}, ...props }) =>
  <TouchableOpacity style={[styles.touchable, style]} {...props}>
    <Text style={[styles.text, textStyle]} weight="bold">
      {label.toUpperCase()}
    </Text>
  </TouchableOpacity>

export default AccessoryButton
