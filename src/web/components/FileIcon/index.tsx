/* eslint-disable import/no-commonjs */

import * as React from 'react'

type FileIconProps = {
  extension: string
}

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

function getSource(extension: string) {
  return IMAGE_FILES[extension.toLowerCase()] || require('./unknown.png')
}

export default class FileIcon extends React.Component {
  props: FileIconProps

  render() {
    const { extension } = this.props
    return (
      <img
        src={getSource(extension)}
        style={{ width: '100%', height: '100%' }}
        alt={`${extension} file extension icon`}
      />
    )
  }
}
