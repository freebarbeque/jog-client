// @flow

import firebase from 'firebase'
import type { UploadAdapter, UploadFileOpts } from '../common/types'

export default class WebUploadAdapter implements UploadAdapter {
  // eslint-disable-next-line no-unused-vars
  static uploadFile(opts: UploadFileOpts): Promise<void> {
    const file: File = opts.file
    const fileStoragePath = opts.fileStoragePath
    const storageRef = firebase.storage().ref()

    if (file) {
      return storageRef.child(fileStoragePath).put(file)
    }
    throw new Error(`Web file upload requires file property.`)
  }
}
