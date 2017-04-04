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

export const Times = (props: ImageProps) => {
  let { scale } = props
  const { style } = props
  scale = scale || 1
  const size = 16 * scale

  return (
    <Image
      style={[{ height: size, width: size }, style]}
      source={require('./times.png')}
    />
  )
}

Times.defaultProps = { scale: 1 }
