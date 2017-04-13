/* @flow */

import React from 'react'
import { Image } from 'react-native'

type LogoProps = {
  scale?: number,
  style?: $Subtype<Object>,
}

export const Logo = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 39.752 * scale, width: 46.713 * scale }, style]}
      source={require('./logo.png')}
    />
  )
}

export const Camera = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 28 * scale, width: 37 * scale }, style]}
      source={require('./camera.png')}
    />
  )
}

export const Command = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 25 * scale, width: 37 * scale }, style]}
      source={require('./cmd.png')}
    />
  )
}

export const Mail = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 23 * scale, width: 37 * scale }, style]}
      source={require('./mail.png')}
    />
  )
}

export const Car = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 69 * scale, width: 169 * scale }, style]}
      source={require('./car.png')}
    />
  )
}

export const CarOutline = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 41 * scale, width: 100 * scale }, style]}
      source={require('./car-outline.png')}
    />
  )
}

export const Chevron = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 10 * scale, width: 12 * scale }, style]}
      source={require('./chevron.png')}
    />
  )
}

export const Ellipses = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 9 * scale, width: 39 * scale }, style]}
      source={require('./ellipses.png')}
    />
  )
}

export const Plus = (props: LogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 29 * scale, width: 30 * scale }, style]}
      source={require('./plus.png')}
    />
  )
}

type BackgroundProps = {
  style?: $Subtype<Object>,
  children?: any,
}

export const Background = (props: BackgroundProps) => {
  const { children = null, style = {} } = props

  return (
    <Image
      style={style}
      source={require('./background.png')}
    >
      {children}
    </Image>
  )
}
