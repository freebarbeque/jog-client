/* @flow */

import React, { Component } from 'react'
import { View, Image } from 'react-native'
import firebase from 'firebase'

type FirebaseImageProps = {
  imagePath: string | null,
  width: number,
}

type FirebaseImageState = {
  imageUrl: string | null,
  dimensions: {
    height: number,
    width: number,
  } | null,
}

export default class FirebaseImage extends Component {
  props: FirebaseImageProps
  state: FirebaseImageState
  unmounting: boolean

  constructor(props: FirebaseImageProps) {
    super(props)
    this.state = { imageUrl: null, dimensions: null }
  }

  componentDidMount() {
    this.downloadImage(this.props.imagePath)
  }

  componentWillReceiveProps(props: FirebaseImageProps) {
    if (props.imagePath !== this.props.imagePath) {
      this.downloadImage(props.imagePath)
    }
  }

  componentWillUnmount() {
    this.unmounting = true
  }

  downloadImage(imagePath: string | null) {
    if (imagePath) {
      console.debug(`Fetching ${imagePath} from firebase storage`)
      const ref = firebase.storage().ref(imagePath)
      this.setState({ imageUrl: null, dimensions: null })
      ref.getDownloadURL().then(url => {
        Image.getSize(url, (width, height) => {
          // TODO: Is there a nicer way of doing this? I'd love to know. Some kind of cancellable promise would be better? Or move to redux?
          if (!this.unmounting) {
            this.setState({
              dimensions: { width, height },
              imageUrl: url,
            })
          }
          if (imagePath)
            console.debug(`Received ${imagePath} from firebase storage: ${url}`)
        })
      })
    } else {
      this.setState({ imageUrl: null })
    }
  }

  render() {
    const imageProps = this.props
    delete imageProps.imagePath
    const imageUrl = this.state.imageUrl
    const dimensions = this.state.dimensions
    if (imageUrl && dimensions) {
      const divisor = dimensions.width / this.props.width
      const height = dimensions.height / divisor

      return (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: this.props.width,
            height,
          }}
          {...imageProps}
        />
      )
    }
    return <View {...imageProps} />
  }
}
