/*
Provides a common interface to android & iOS files, camera & images

@flow
 */
import { Platform, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ImagePicker from 'react-native-image-picker'

const iOSFilePicker = NativeModules.RNDocumentPicker
const androidFilePicker = NativeModules.FilePickerManager

export type PickFileResponse = {
  url: string,
  extension: string,
  fileName: string,
}

export function pickFile() : Promise<PickFileResponse> {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      iOSFilePicker.show({
        filetype: ['public.image', 'com.adobe.pdf'],
      }, (error, url) => {
        if (error) reject(error)
        else {
          const decodedUrl = decodeURIComponent(url)
          const path = decodedUrl.split('file://').pop()
          const extension = path.split('.').pop().toLowerCase()
          const fileName = path.split('/').pop()

          resolve({
            url: decodedUrl,
            extension,
            fileName
          })
        }
      })
    } else {
      androidFilePicker.showFilePicker(null, (response) => {
        if (response.error) {
          reject(response.error)
        } else {
          const url = decodeURIComponent(response.path)
          const extension = url.split('.').pop().toLowerCase()
          const fileName = url.split('/').pop()
          resolve({ url, extension, fileName })
        }
      })
    }
  })
}

export type iOSImageResponse = {
  origURL: string,
  uri: string,
  fileName: string,
  width: number,
  height: number,
  extension: string,
  fileSize: number,
  isVertical: boolean,
}

export function useIOSCamera() : Promise<iOSImageResponse | null> {
  return new Promise((resolve, reject) => {
    const isSimulator = DeviceInfo.getModel() === 'Simulator'
    // The simulator has no camera access so use image library instead for testing
    const responseHandler = (response) => {
      console.log('response', response)
      if (response.error) {
        reject(response.error)
      } else if (response.didCancel) {
        resolve(null)
      } else {
        let extension
        let fileName
        if (response.fileName) {
          fileName = response.fileName
          extension = fileName.split('.').pop().toLowerCase()
        } else {
          fileName = response.uri.split('/').pop()
          extension = fileName.split('.').pop().toLowerCase()
        }
        resolve({
          ...response,
          extension,
          fileName
        })
      }
    }

    if (Platform.OS === 'ios' && isSimulator) {
      ImagePicker.launchImageLibrary({ noData: true }, responseHandler)
    } else if (Platform.OS === 'ios') {
      ImagePicker.showImagePicker({ noData: true }, responseHandler)
    } else if (Platform.OS === 'android') {
      throw new Error('This should not be used for android')
    }
  })
}
