import * as firebase from 'firebase'
import * as React from 'react'
import Logger, { Levels } from '~/common/Logger'

const log = new Logger('components/FirebaseImage', Levels.TRACE)

interface IProps {
  imagePath?: string | null
  width: number
  alt: string
}

interface IState {
  imageUrl: string | null
  dimensions: {
    height: number
    width: number
  } | null
}

export default class FirebaseImage extends React.Component<IProps, IState> {
  private unmounting: boolean

  constructor(props: IProps) {
    super(props)
    this.state = { imageUrl: null, dimensions: null }
  }

  public componentDidMount() {
    this.downloadImage(this.props.imagePath)
  }

  public componentWillReceiveProps(props: IProps) {
    if (props.imagePath !== this.props.imagePath) {
      this.downloadImage(props.imagePath)
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

  private downloadImage(imagePath?: string | null) {
    if (imagePath) {
      log.debug(`Fetching ${imagePath} from firebase storage`)
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
}
