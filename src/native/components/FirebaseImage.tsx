import * as firebase from 'firebase'
import * as React from 'react'
import { Image, View } from 'react-native'

interface IFirebaseImageProps {
  imagePath?: string | null
  width: number
}

interface IFirebaseImageState {
  imageUrl: string | null
  dimensions: {
    height: number
    width: number
  } | null
}

export default class FirebaseImage extends React.Component<
  IFirebaseImageProps,
  IFirebaseImageState
> {
  private unmounting: boolean

  constructor(props: IFirebaseImageProps) {
    super(props)
    this.state = { imageUrl: null, dimensions: null }
  }

  public componentDidMount() {
    if (this.props.imagePath) this.downloadImage(this.props.imagePath)
  }

  public componentWillReceiveProps(props: IFirebaseImageProps) {
    if (props.imagePath !== this.props.imagePath) {
      this.downloadImage(props.imagePath || null)
    }
  }

  public componentWillUnmount() {
    this.unmounting = true
  }

  public render() {
    const imageProps = this.props
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

  private downloadImage(imagePath: string | null) {
    if (imagePath) {
      console.debug(`Fetching ${imagePath} from firebase storage`)
      const ref = firebase.storage().ref(imagePath)
      this.setState({ imageUrl: null, dimensions: null })
      ref.getDownloadURL().then(url => {
        Image.getSize(
          url,
          (width, height) => {
            // TODO: Is there a nicer way of doing this? I'd love to know. Some kind of cancellable promise would be better? Or move to redux?
            if (!this.unmounting) {
              this.setState({
                dimensions: { width, height },
                imageUrl: url,
              })
            }
            if (imagePath)
              console.debug(
                `Received ${imagePath} from firebase storage: ${url}`,
              )
          },
          err => {
            console.error(`Error downloading image`, err)
          },
        )
      })
    } else {
      this.setState({ imageUrl: null })
    }
  }
}
