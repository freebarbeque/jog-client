import * as React from 'react'
import { Image } from 'react-native'

interface IFileIconProps {
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

export default class FileIcon extends React.Component<IFileIconProps> {
  public render() {
    return (
      <Image
        source={getSource(this.props.extension)}
        style={{ width: '100%', height: '100%' }}
      />
    )
  }
}
