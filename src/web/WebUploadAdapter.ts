import * as firebase from 'firebase'
import { UploadFileOpts } from '../common/types'

export default class WebUploadAdapter  {
  // eslint-disable-next-line no-unused-vars
  static uploadFile(opts: UploadFileOpts) {
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
