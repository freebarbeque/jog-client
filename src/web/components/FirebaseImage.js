/* @flow */

import React, { Component } from 'react'
import firebase from 'firebase'

type FirebaseImageProps = {
  imagePath: string | null,
  width: number,
  alt: string,
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
        const img = new Image()
        img.onload = () => {
          this.setState({
            dimensions: { width: img.width, height: img.height },
            imageUrl: url,
          })
        }
        img.src = url
      })
    } else {
      this.setState({ imageUrl: null })
    }
  }

  render() {
    const imageProps = this.props
    const imageUrl = this.state.imageUrl
    const dimensions = this.state.dimensions
    if (imageUrl && dimensions) {
      const divisor = dimensions.width / this.props.width
      const height = dimensions.height / divisor

      return (
        <img
          src={imageUrl}
          style={{
            width: this.props.width,
            height,
          }}
          alt={this.props.alt}
          {...imageProps}
        />
      )
    }

    return <div {...imageProps} />
  }
}
