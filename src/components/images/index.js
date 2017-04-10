/* @flow */

import React from 'react'
import { Image } from 'react-native'

type LogoProps = {
  scale?: number,
  style?: $Subtype<Object>,
}

export const Logo = (props: LogoProps) => {
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

type BackgroundProps = {
  style?: $Subtype<Object>,
  children?: any,
}

export const Background = (props: BackgroundProps) => {
  let { style } = props
  const { children } = props
  style = style || {}

  return (
    <Image
      style={style}
      source={require('./background.png')}
    >
      {children}
    </Image>
  )
}

Background.defaultProps = { style: {}, children: null }
