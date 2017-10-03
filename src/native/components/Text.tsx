// Replaces react-native/Text with a Text component that encapsulates Jog's defaults.

import * as React from 'react'
import { Text } from 'react-native'

import { WHITE } from '~/common/constants/palette'

const DEFAULT_STYLE = {
  color: WHITE,
  backgroundColor: 'transparent',
}

// If we eject from expo, we can improve on this loading the fonts manually
const FONT_MAP = {
  black: 'Black',
  bold: 'Bold',
  'extra-bold': 'ExtraBold',
  'extra-light': 'ExtraLight',
  light: 'Light',
  medium: 'Medium',
  regular: 'Regular',
  'semi-bold': 'SemiBold',
  thin: 'Thin',
}

const JogText = ({ style = {}, children, weight = 'regular', ...props }) => {
  return (
    <Text
      style={[
        DEFAULT_STYLE,
        style,
        { fontFamily: `WorkSans-${FONT_MAP[weight]}` },
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

export default JogText
