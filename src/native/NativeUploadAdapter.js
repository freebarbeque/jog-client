// @flow

import type { UploadAdapter, UploadFileOpts } from '../common/types'
import { getFirestack } from './data/index'

export default class NativeUploadAdapter implements UploadAdapter {
  static uploadFile(opts: UploadFileOpts): Promise<void> {
    const filepath = opts.filePath

    if (filepath) {
      return getFirestack().storage.uploadFile(opts.fileStoragePath, filepath, {
        contentType: opts.contentEncoding,
        contentEncoding: opts.contentEncoding,
      })
    }
    throw new Error('Native file upload requires filePath property')
  }
}
