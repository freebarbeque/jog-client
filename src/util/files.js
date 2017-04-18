/*
Provides a common interface to android & iOS files, camera & images

@flow
 */
import { Platform, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import ImagePicker from 'react-native-image-picker'

const iOSFilePicker = NativeModules.RNDocumentPicker
const androidFilePicker = NativeModules.FilePickerManager

export function pickFile() : Promise<string> {
  // TODO: Android support
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      iOSFilePicker.show({
        filetype: ['public.image', 'com.adobe.pdf'],
      }, (error, url) => {
        if (error) reject(error)
        else resolve(url)
      })
    } else {
      androidFilePicker.showFilePicker(null, (response) => {
        if (response.error) {
          reject(response.error)
        } else {
          resolve(`file://${response.path}`)
        }
      })
    }
  })
}

export function useCamera() : Promise<string> {
  return new Promise((resolve, reject) => {
    const isSimulator = DeviceInfo.getModel() === 'Simulator'
    // The simulator has no camera access so use image library instead for testing
    if (Platform.OS === 'ios' && isSimulator) {
      ImagePicker.launchImageLibrary({ noData: true }, (response) => {
        if (response.error) reject(response.error)
        else resolve(response.uri)
      })
    } else if (Platform.OS === 'android' && isSimulator) {
      pickFile().then(resolve).catch(reject)
    } else {
      ImagePicker.launchCamera({ noData: true }, (response) => {
        if (response.error) reject(response.error)
        else resolve(response.uri)
      })
    }
  })
}

export type FileMetaData = {
  path: string,
  uri: string,
  fileName: string,
  extension: string,
}

export function getFileMetadataFromURI(uri: string) : FileMetaData {
  const split = uri.split('file:///')
  const path = split[1]
  const fileName = path.split('/').pop()
  const extension = fileName.split('.').pop()
  return {
    path,
    uri,
    fileName,
    extension
  }
}
