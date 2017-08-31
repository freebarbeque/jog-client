import * as React from 'react'
import { Image } from 'react-native'

interface ILogoProps {
  scale?: number
  style?: any
}

export const Logo = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 23 * scale, width: 47 * scale }, style]}
      source={require('./logo.png')}
    />
  )
}

export const Camera = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 28 * scale, width: 37 * scale }, style]}
      source={require('./camera.png')}
    />
  )
}

export const CameraWhite = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 47 * scale, width: 55 * scale }, style]}
      source={require('./camera-white.png')}
    />
  )
}

export const Command = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 25 * scale, width: 37 * scale }, style]}
      source={require('./cmd.png')}
    />
  )
}

export const Mail = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 23 * scale, width: 37 * scale }, style]}
      source={require('./mail.png')}
    />
  )
}

export const Car = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 69 * scale, width: 169 * scale }, style]}
      source={require('./car.png')}
    />
  )
}

export const CarOutline = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 41 * scale, width: 100 * scale }, style]}
      source={require('./car-outline.png')}
    />
  )
}

export const Chevron = (props: ILogoProps) => {
  const { style = {}, scale = 1, ...rest } = props

  return (
    <Image
      style={[{ height: 10 * scale, width: 12 * scale }, style]}
      source={require('./chevron.png')}
      {...rest}
    />
  )
}

export const Dropdown = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 10 * scale, width: 17 * scale }, style]}
      source={require('./dropdown.png')}
    />
  )
}

export const Ellipses = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 9 * scale, width: 39 * scale }, style]}
      source={require('./ellipses.png')}
    />
  )
}

export const Plus = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 31 * scale, width: 31 * scale }, style]}
      source={require('./plus.png')}
    />
  )
}

export const Cancel = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 18 * scale, width: 18 * scale }, style]}
      source={require('./cancel.png')}
    />
  )
}

export const Warning = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 69 * scale, width: 75 * scale }, style]}
      source={require('./warning.png')}
    />
  )
}

export const Notification = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 581 * scale, width: 864 * scale }, style]}
      source={require('./notification.png')}
    />
  )
}

export const AddProfilePicture = (props: ILogoProps) => {
  const { style = {}, scale = 1 } = props

  return (
    <Image
      style={[{ height: 77 * scale, width: 77 * scale }, style]}
      source={require('./AddProfilePicture.png')}
    />
  )
}

interface IBackgroundProps {
  style?: any
  children?: any
}

export const Background = (props: IBackgroundProps) => {
  const { children = null, style = {} } = props

  return (
    <Image style={style} source={require('./background.png')}>
      {children}
    </Image>
  )
}
