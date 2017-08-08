import * as firebase from 'firebase'
import * as React from 'react'

interface FirebaseImageProps {
  imagePath: string | null
  width: number
  alt: string
}

interface FirebaseImageState {
  imageUrl: string | null
  dimensions: {
    height: number
    width: number
  } | null
}

export default class FirebaseImage extends React.Component {
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
      const width = this.props.width
      const divisor = dimensions.width / width
      const height = dimensions.height / divisor

      const alt = this.props.alt
      return (
        <img
          src={imageUrl}
          style={{
            width,
            height,
          }}
          alt={alt}
          {...imageProps}
        />
      )
    }

    return <div />
  }
}
