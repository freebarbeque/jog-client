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

export const Camera = (props: LogoProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 28 * scale, width: 37 * scale }, style]}
      source={require('./camera.png')}
    />
  )
}

Camera.defaultProps = { scale: 1, style: {} }

export const Command = (props: LogoProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 25 * scale, width: 37 * scale }, style]}
      source={require('./cmd.png')}
    />
  )
}

Command.defaultProps = { scale: 1, style: {} }

export const Mail = (props: LogoProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 23 * scale, width: 37 * scale }, style]}
      source={require('./mail.png')}
    />
  )
}

Mail.defaultProps = { scale: 1, style: {} }

export const Car = (props: LogoProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 69 * scale, width: 169 * scale }, style]}
      source={require('./car.png')}
    />
  )
}

Car.defaultProps = { scale: 1, style: {} }

export const Ellipses = (props: LogoProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 9 * scale, width: 39 * scale }, style]}
      source={require('./ellipses.png')}
    />
  )
}

Ellipses.defaultProps = { scale: 1, style: {} }

export const Plus = (props: LogoProps) => {
  let { scale, style } = props
  scale = scale || 1
  style = style || {}

  return (
    <Image
      style={[{ height: 29 * scale, width: 30 * scale }, style]}
      source={require('./plus.png')}
    />
  )
}

Plus.defaultProps = { scale: 1, style: {} }

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
