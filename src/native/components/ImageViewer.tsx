import * as React from 'react'
import { Dimensions, Image } from 'react-native'
import PhotoView from 'react-native-photo-view'

import Spinner from './Spinner'

interface IImageViewerProps {
  uri: string
  fileName: string
}

interface IImageViewerState {
  width: number | null
  height: number | null
}

export default class ImageViewer extends React.Component<
  IImageViewerProps,
  IImageViewerState
> {
  constructor(props: IImageViewerProps) {
    super(props)
    this.state = {
      width: null,
      height: null,
    }
  }

  public componentDidMount() {
    this.fetchImageDimensions()
  }

  public componentDidUpdate(nextProps: IImageViewerProps) {
    const uri = nextProps.uri
    if (uri !== this.props.uri) {
      this.fetchImageDimensions()
    }
  }

  public render() {
    const isLoaded = this.props.uri && this.state.width && this.state.height
    const fileName = this.props.fileName

    return isLoaded
      ? <PhotoView
          source={{ uri: this.props.uri }}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType="center"
          onLoad={() => console.log('Image loaded!')}
          style={{
            flex: 1,
            width: this.state.width,
            height: this.state.height,
          }}
        />
      : <Spinner text={`Loading ${fileName}`} />
  }

  private fetchImageDimensions() {
    // Force loading state
    this.setState({
      width: null,
      height: null,
    })

    Image.getSize(
      this.props.uri,
      (width, height) => {
        const displayWidth = Dimensions.get('window').width
        const displayHeight = displayWidth / width * height

        this.setState({
          width: displayWidth,
          height: displayHeight,
        })
      },
      err => {
        console.error('Error  getting image size', err)
        // TODO: Handle & display error?
      },
    )
  }
}
