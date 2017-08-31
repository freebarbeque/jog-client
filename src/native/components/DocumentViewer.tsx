import * as firebase from 'firebase'
import * as React from 'react'

import { IPolicyDocument } from '~/common/types'
import Spinner from '~/native/components/Spinner'

import ImageViewer from './ImageViewer'
import PDFViewer from './PDFViewer'

interface IDocumentViewerProps {
  document: IPolicyDocument
}

interface IDocumentViewerState {
  url: string | null
}

export default class DocumentViewer extends React.Component<
  IDocumentViewerProps,
  IDocumentViewerState
> {
  constructor(props: IDocumentViewerProps) {
    super(props)
    this.state = {
      url: null,
    }
  }

  public componentDidMount() {
    this.getDocument().catch(err => {
      console.error(err)
    })
  }

  public render() {
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

  private async getDocument() {
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
}
