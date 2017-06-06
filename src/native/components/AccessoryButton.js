import React, { PropTypes } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { DARK_GRAY } from 'jog/src/common/constants/palette'

import Text from './Text'

const styles = StyleSheet.create({
  touchable: {},
  text: {
    color: DARK_GRAY,
    fontWeight: '700',
  },
})

const AccessoryButton = ({ label, style = {}, textStyle = {}, ...props }) => (
  <TouchableOpacity style={[styles.touchable, style]} {...props}>
    <Text style={[styles.text, textStyle]} weight="bold">
      {label.toUpperCase()}
    </Text>
  </TouchableOpacity>
)

AccessoryButton.propTypes = {
  label: PropTypes.string,
  ...TouchableOpacity.propTypes,
}

export default AccessoryButton
