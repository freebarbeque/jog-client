import * as React from 'react'

// tslint:disable-next-line:no-var-requires
const cn = require('classnames')

interface ImageProps {
  src: any
  scale?: number
  width: number
  height: number
  className?: string
  alt?: string
}

const Image = (props: ImageProps) => {
  const { src, className, height, width, scale = 1, ...rest } = props

  return (
    <img
      src={src}
      className={cn('image', className)}
      height={height * scale}
      width={width * scale}
      alt=""
      {...rest}
    />
  )
}

export const Logo = (props: { scale?: number; style?: any }) => {
  return (
    <Image
      src={require('./logo.svg')}
      height={23}
      width={47}
      className="logo"
      {...props}
    />
  )
}

export const Cross = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./cross.svg')}
      height={14}
      width={14}
      alt="logo"
      className="logo"
      {...props}
    />
  )
}

export const Camera = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./camera.svg')}
      height={25}
      width={34}
      alt="camera"
      className="camera"
      {...props}
    />
  )
}

export const Car = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./car.svg')}
      height={46}
      width={116}
      alt="car"
      className="car"
      {...props}
    />
  )
}

export const Cursor = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./cursor.svg')}
      height={22}
      width={34}
      alt="cursor"
      className="cursor"
      {...props}
    />
  )
}

export const Ellipsis = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./ellipsis.svg')}
      height={7}
      width={34}
      alt="ellipsis"
      className="ellipsis"
      {...props}
    />
  )
}

export const Letter = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./mail.svg')}
      height={19}
      width={34}
      alt="letter"
      className="letter"
      {...props}
    />
  )
}

export const Plus = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./plus.svg')}
      height={27}
      width={27}
      alt="plus"
      className="plus"
      {...props}
    />
  )
}

export const CarOutline = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./car-outline.svg')}
      height={46.697}
      width={116.8}
      alt="car outline"
      className="car-outline"
      {...props}
    />
  )
}

export const Warning = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./warning.png')}
      height={69}
      width={75}
      alt="warning"
      className="warning-img"
      {...props}
    />
  )
}

export const Chevron = (props: {
  scale?: number
  color?: 'white' | 'blue'
  style?: any
}) => {
  return (
    <Image
      src={
        props.color === 'white'
          ? require('./chevron-white.svg')
          : require('./chevron-blue.svg')
      }
      height={9.838}
      width={5.74}
      alt="chevron"
      className="chevron"
      scale={props.scale}
      {...props}
    />
  )
}

export const Details = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./details.svg')}
      height={56.387}
      width={66.425}
      alt="Policy Details"
      className="policy-details-img"
      {...props}
    />
  )
}

export const PolicyBots = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./policy-bots.svg')}
      height={47.607}
      width={67.148}
      alt="Policy Bots"
      className="policy-bots-img"
      {...props}
    />
  )
}

export const Upload = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./upload.svg')}
      height={91.643}
      width={83.845}
      alt="Upload"
      className="upload-img"
      {...props}
    />
  )
}

export const Arrow = (props: { scale?: number; style?: any }) => {
  return (
    <Image
      src={require('./arrow.svg')}
      height={16.971}
      width={20.152}
      alt="left facing arrow"
      className="arrow-img"
      {...props}
    />
  )
}

export const Tick = (props: { scale?: number }) => {
  return (
    <Image
      src={require('./tick.svg')}
      height={11.279}
      width={15.197}
      alt="tick"
      className="tick-img"
      {...props}
    />
  )
}
