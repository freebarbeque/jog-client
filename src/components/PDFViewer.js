// @flow

import React, { Component } from 'react'
import { WebView, Dimensions } from 'react-native'
import PDFView from 'react-native-pdf-view'
import RNFetchBlob from 'react-native-fetch-blob'

import { isAndroid } from '../util/system'
import { CREAM } from '../constants/palette'
import Spinner from './Spinner'

type PDFViewerProps = {
  url: string,
  fileName: string,
}

type PDFViewerState = {
  androidPdfLocation: string | null,
}

async function downloadDocument(url: string, fileName: string) : Promise<string> {
  const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir
  const res = await RNFetchBlob.fetch('GET', url)
  const base64str = res.data
  const pdfLocation = `${DocumentDir}/${fileName}`
  await RNFetchBlob.fs.writeFile(pdfLocation, base64str, 'base64')
  console.debug(`Wrote ${url} to ${pdfLocation}`)
  return pdfLocation
}

export default class PDFViewer extends Component {
  props: PDFViewerProps
  state: PDFViewerState

  constructor(props: PDFViewerProps) {
    super(props)
    this.state = {
      androidPdfLocation: null,
    }
  }

  componentDidMount() {
    const { url, fileName } = this.props

    if (isAndroid()) {
      console.log('url', url)
      downloadDocument(url, fileName).then((androidPdfLocation) => {
        this.setState({ androidPdfLocation })
      })
    }
  }

  render() {
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
      return (
        <Spinner
          text={`Loading ${fileName}`}
        />
      )
    }

    return null
  }
}
