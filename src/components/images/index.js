import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import stylePropType from 'react-style-proptype'

// eslint-disable-next-line import/prefer-default-export
export const Logo = ({ scale, style }) => (
  <Image
    style={{ height: 168 * scale, width: 300 * scale, ...style }}
    source={require('./logo-placeholder.png')}
  />
)

Logo.propTypes = {
  scale: PropTypes.number,
  style: stylePropType,
}

Logo.defaultProps = {
  scale: 1,
  style: {},
}

