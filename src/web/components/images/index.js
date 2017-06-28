import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Image = props => {
  const { src, className, height, width, scale, ...rest } = props

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

Image.propTypes = {
  src: PropTypes.any.isRequired,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
}

Image.defaultProps = { scale: 1, className: '' }

export const Logo = props => {
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

Logo.propTypes = { scale: PropTypes.number }

export const Cross = props => {
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

Cross.propTypes = { scale: PropTypes.number }

export const Camera = props => {
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

Camera.propTypes = { scale: PropTypes.number }

export const Car = props => {
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

Car.propTypes = { scale: PropTypes.number }

export const Cursor = props => {
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

Cursor.propTypes = { scale: PropTypes.number }

export const Ellipsis = props => {
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

Ellipsis.propTypes = { scale: PropTypes.number }

export const Letter = props => {
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

Letter.propTypes = { scale: PropTypes.number }

export const Plus = props => {
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

Plus.propTypes = { scale: PropTypes.number }

export const CarOutline = props => {
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

CarOutline.propTypes = { scale: PropTypes.number }

export const Warning = props => {
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

Warning.propTypes = { scale: PropTypes.number }

export const Chevron = props => {
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

Chevron.propTypes = {
  scale: PropTypes.number,
  color: PropTypes.oneOf(['white', 'blue']),
}

Chevron.defaultProps = {
  color: 'blue',
}

export const Details = props => {
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

Details.propTypes = { scale: PropTypes.number }

export const PolicyBots = props => {
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

PolicyBots.propTypes = { scale: PropTypes.number }

export const Upload = props => {
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

Upload.propTypes = { scale: PropTypes.number }
