/*
Provides a common interface to android & iOS files, camera & images
 */
import { NativeModules, Platform } from 'react-native'

const DeviceInfo = require('react-native-device-info')
const ImagePicker = require('react-native-image-picker')

const iOSFilePicker = NativeModules.RNDocumentPicker
const androidFilePicker = NativeModules.FilePickerManager

export interface IPickFileResponse {
  url: string
  extension: string | null
  fileName: string | null
}

export function pickFile(): Promise<IPickFileResponse> {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      iOSFilePicker.show(
        {
          filetype: ['public.image', 'com.adobe.pdf'],
        },
        (error, url) => {
          if (error) reject(error)
          else {
            const decodedUrl = decodeURIComponent(url)
            const path = decodedUrl.split('file://').pop()

            let extension
            let fileName

            if (path) {
              extension = ((path.split('.') || []).pop() || '').toLowerCase()
              fileName = path.split('/').pop()
            }

            resolve({
              url: decodedUrl,
              extension,
              fileName,
            })
          }
        },
      )
    } else {
      androidFilePicker.showFilePicker(null, response => {
        if (response.error) {
          reject(response.error)
        } else {
          const url = decodeURIComponent(response.path)
          const extension =
            ((url.split('.') || []).pop() || '').toLowerCase() || null
          const fileName = url.split('/').pop() || null
          resolve({ url, extension, fileName })
        }
      })
    }
  })
}

export interface IIOSImageResponse {
  origURL: string
  uri: string
  fileName: string
  width: number
  height: number
  extension: string
  fileSize: number
  isVertical: boolean
}

export function useIOSCamera(): Promise<IIOSImageResponse | null> {
  return new Promise((resolve, reject) => {
    const isSimulator = DeviceInfo.getModel() === 'Simulator'
    // The simulator has no camera access so use image library instead for testing
    const responseHandler = response => {
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
          fileName,
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
