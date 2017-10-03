import { IUploadFileOpts } from '../common/types'
import { getFirestack } from './data/index'

export default class NativeUploadAdapter {
  public static uploadFile(opts: IUploadFileOpts): Promise<void> {
    const filepath = opts.filePath

    if (filepath) {
      const fireStack = getFirestack()
      return fireStack.storage.uploadFile(opts.fileStoragePath, filepath, {
        contentType: opts.contentEncoding,
        contentEncoding: opts.contentEncoding,
      })
    }
    throw new Error('Native file upload requires filePath property')
  }
}
