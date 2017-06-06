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

Image.defaultProps = {
  scale: 1,
  className: '',
}

export const Logo = props => {
  const { scale, ...rest } = props

  return (
    <Image
      src={require('./logo.svg')}
      height={23}
      width={47}
      scale={scale}
      alt="logo"
      className="logo"
      {...rest}
    />
  )
}

Logo.propTypes = {
  scale: PropTypes.number,
}
