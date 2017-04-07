/* @flow */

import React from 'react'
import { Image } from 'react-native'

type ImageProps = {
  scale?: number,
  style?: $Subtype<Object>,
}

export const Logo = (props: ImageProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 39.752 * scale, width: 46.713 * scale }, style]}
      source={require('./logo.png')}
    />
  )
}

Logo.defaultProps = { scale: 1, style: {} }
