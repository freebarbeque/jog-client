// @flow

import type { UploadAdapter, UploadFileOpts } from '../common/types'

export default class WebUploadAdapter implements UploadAdapter {
  // eslint-disable-next-line no-unused-vars
  static uploadFile(opts: UploadFileOpts): Promise<void> {
    return Promise.resolve()
  }
}
