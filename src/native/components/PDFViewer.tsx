import * as React from 'react'
import { Dimensions, WebView } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import PDFView from 'react-native-pdf-view'

import { CREAM } from '~/common/constants/palette'
import { isAndroid } from '~/native/util/system'

import Spinner from './Spinner'

interface IPDFViewerProps {
  url: string
  fileName: string
}

interface IPDFViewerState {
  androidPdfLocation: string | null
}

export default class PDFViewer extends React.Component<
  IPDFViewerProps,
  IPDFViewerState
> {
  constructor(props: IPDFViewerProps) {
    super(props)
    this.state = {
      androidPdfLocation: null,
    }
  }

  public componentDidMount() {
    const { url } = this.props

    if (isAndroid() && url) {
      this.fetchDocument().catch(err => {
        console.error('Error fetching document', err)
      })
    }
  }

  public componentDidUpdate(nextProps: IPDFViewerProps) {
    if (this.props.url !== nextProps.url) {
      this.fetchDocument().catch(err => {
        console.error('Error refetching document', err)
      })
    }
  }

  public render() {
    const windowWidth = Dimensions.get('window').width
    const { url, fileName } = this.props
    const androidPdfLocation = this.state.androidPdfLocation
    const isLoaded = isAndroid() ? androidPdfLocation : url

    if (isLoaded) {
      if (isAndroid()) {
        return (
          <PDFView
            src={androidPdfLocation}
            style={{ flex: 1, width: windowWidth }}
          />
        )
      } else if (url) {
        return (
          <WebView
            source={{ uri: url }}
            style={{ width: windowWidth, backgroundColor: CREAM }}
            javaScriptEnabled={false}
            domStorageEnabled={false}
            scalesPageToFit
            automaticallyAdjustContentInsets={false}
          />
        )
      }
    } else {
      return <Spinner text={`Loading ${fileName}`} />
    }

    return null
  }

  private async fetchDocument() {
    const { url, fileName } = this.props

    const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir
    const res = await RNFetchBlob.fetch('GET', url)
    const base64str = res.data
    const androidPdfLocation = `${DocumentDir}/${fileName}`
    await RNFetchBlob.fs.writeFile(androidPdfLocation, base64str, 'base64')
    console.debug(`Wrote ${url} to ${androidPdfLocation}`)
    this.setState({ androidPdfLocation })
  }
}
