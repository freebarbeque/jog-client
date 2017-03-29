/* @flow */

import React from 'react'
import { Image } from 'react-native'
import SvgUri from 'react-native-svg-uri'

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

  return (
    <SvgUri
      width={30 * scale}
      height={30 * scale}
      style={style}
      source={require('./times.svg')}
    />
  )
}

Times.defaultProps = { scale: 1 }
