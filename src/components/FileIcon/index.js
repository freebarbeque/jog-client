/* eslint-disable import/no-commonjs */
/* @flow */

import React, { Component } from 'react'
import { Image } from 'react-native'

type FileIconProps = {
  extension: string
};

const IMAGE_FILES = {
  jpg: require('./jpg.png'),
  jpeg: require('./jpg.png'),
  bmp: require('./bmp.png'),
  bitmap: require('./bmp.png'),
  png: require('./png.png'),
  pdf: require('./pdf.png'),
  tif: require('./tif.png'),
  tiff: require('./tif.png'),
}

function getSource(extension) {
  return IMAGE_FILES[extension] || require('./unknown.png')
}

export default class FileIcon extends Component {
  props: FileIconProps

  render() {
    const { extension } = this.props
    return (
      <Image source={getSource(extension)} style={{ width: '100%', height: '100%' }} />
    )
  }
}

