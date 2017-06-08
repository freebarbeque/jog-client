// @flow

import type { UploadAdapter, UploadFileOpts } from '../common/types'
import { getFirestack } from './data/index'

export default class NativeUploadAdapter implements UploadAdapter {
  static uploadFile(opts: UploadFileOpts): Promise<void> {
    return getFirestack().storage.uploadFile(
      opts.fileStoragePath,
      opts.filePath,
      {
        contentType: opts.contentEncoding,
        contentEncoding: opts.contentEncoding,
      },
    )
  }
}
