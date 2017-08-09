import * as firebase from 'firebase'
import { IUploadFileOpts } from '../common/types'

export default class WebUploadAdapter {
  // eslint-disable-next-line no-unused-vars
  public static uploadFile(opts: IUploadFileOpts) {
    const file: File = opts.file
    console.log('file', file)
    const fileStoragePath = opts.fileStoragePath
    const storageRef = firebase.storage().ref()

    if (file) {
      console.log(`Uploading file to ${fileStoragePath}`, file)
      return storageRef.child(fileStoragePath).put(file)
    }

    throw new Error(`Web file upload requires file property.`)
  }
}
