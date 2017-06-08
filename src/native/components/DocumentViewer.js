/* @flow */

import React, { Component } from 'react'
import firebase from 'firebase'

import Spinner from 'jog/src/native/components/Spinner'
import type { PolicyDocument } from 'jog/src/common/types'

import PDFViewer from './PDFViewer'
import ImageViewer from './ImageViewer'

type DocumentViewerProps = {
  document: PolicyDocument,
}

type DocumentViewerState = {
  url: string | null,
}

export default class DocumentViewer extends Component {
  props: DocumentViewerProps
  state: DocumentViewerState

  constructor(props: DocumentViewerProps) {
    super(props)
    this.state = {
      url: null,
    }
  }

  componentDidMount() {
    this.getDocument().catch(err => {
      console.error(err)
    })
  }

  async getDocument() {
    const document = this.props.document

    if (document) {
      const path = document.image
      const ref = firebase.storage().ref(path)
      const url = await ref.getDownloadURL()

      console.debug(`Obtained download url for ${document.name}: ${url}`)

      this.setState({
        url,
      })
    }
  }

  render() {
    const { document } = this.props
    const { url } = this.state
    const name = document ? document.name : ''

    if (document) {
      if (document.extension === 'pdf' && url) {
        return <PDFViewer url={url} fileName={document.name} />
      } else if (url) {
        console.log('rendering PhotoView', url)
        return <ImageViewer uri={url} fileName={document.name} />
      }
    }

    return <Spinner text={`Loading ${name}`} />
  }
}
