// @flow

import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'
import PhotoView from 'react-native-photo-view'

import Spinner from './Spinner'

type ImageViewerProps = {
  uri: string,
  fileName: string,
}

type ImageViewerState = {
  width: number | null,
  height: number | null,
}

export default class ImageViewer extends Component {
  props: ImageViewerProps
  state: ImageViewerState

  constructor(props: ImageViewerProps) {
    super(props)
    this.state = {
      width: null,
      height: null
    }
  }

  componentDidMount() {
    this.fetchImageDimensions()
  }

  componentDidUpdate(nextProps: ImageViewerProps) {
    const uri = nextProps.uri
    if (uri !== this.props.uri) {
      this.fetchImageDimensions()
    }
  }

  fetchImageDimensions() {
    // Force loading state
    this.setState({
      width: null,
      height: null
    })

    Image.getSize(
      this.props.uri,
      (width, height) => {
        const displayWidth = Dimensions.get('window').width
        const displayHeight = (displayWidth / width) * height

        this.setState({
          width: displayWidth,
          height: displayHeight
        })
      }
    )
  }

  render() {
    const isLoaded = this.props.uri && this.state.width && this.state.height
    const fileName = this.props.fileName

    return isLoaded ? (
      <PhotoView
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
    ) : <Spinner
      text={`Loading ${fileName}`}
    />
  }
}
