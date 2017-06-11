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
